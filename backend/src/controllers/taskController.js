const { validationResult } = require("express-validator");
const Project = require("../models/Project");
const Task = require("../models/Task");

const hasProjectAccess = (project, userId) =>
  project.members.some((member) => member.user.toString() === userId.toString());

const getProjectRole = (project, userId) => {
  const member = project.members.find((item) => item.user.toString() === userId.toString());
  return member ? member.role : null;
};

const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Validation failed", errors: errors.array() });
  }

  const { title, description, projectId, assignedTo, dueDate, status } = req.body;
  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (!hasProjectAccess(project, req.user._id) || !hasProjectAccess(project, assignedTo)) {
    return res.status(403).json({ message: "Assignee and creator must be project members" });
  }

  const task = await Task.create({
    title,
    description,
    project: projectId,
    assignedTo,
    createdBy: req.user._id,
    dueDate,
    status: status || "Todo"
  });

  const populatedTask = await task.populate([
    { path: "assignedTo", select: "name email" },
    { path: "createdBy", select: "name email" }
  ]);
  return res.status(201).json(populatedTask);
};

const getProjectTasks = async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (!hasProjectAccess(project, req.user._id)) {
    return res.status(403).json({ message: "Forbidden: not a project member" });
  }

  const tasks = await Task.find({ project: req.params.projectId })
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });
  return res.json(tasks);
};

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const project = await Project.findById(task.project);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const role = getProjectRole(project, req.user._id);
  if (!role) {
    return res.status(403).json({ message: "Forbidden: not a project member" });
  }

  const isAssignee = task.assignedTo.toString() === req.user._id.toString();
  if (role !== "Admin" && !isAssignee) {
    return res.status(403).json({ message: "Only admin or assignee can update this task" });
  }

  const fields = ["title", "description", "status", "dueDate", "assignedTo"];
  fields.forEach((field) => {
    if (typeof req.body[field] !== "undefined") {
      task[field] = req.body[field];
    }
  });

  await task.save();
  const populatedTask = await task.populate([
    { path: "assignedTo", select: "name email" },
    { path: "createdBy", select: "name email" }
  ]);
  return res.json(populatedTask);
};

const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const project = await Project.findById(task.project);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const role = getProjectRole(project, req.user._id);
  if (role !== "Admin") {
    return res.status(403).json({ message: "Only project admins can delete tasks" });
  }

  await task.deleteOne();
  return res.json({ message: "Task deleted" });
};

const getDashboardSummary = async (req, res) => {
  const myTasks = await Task.find({ assignedTo: req.user._id });
  const now = new Date();
  const overdueCount = myTasks.filter(
    (task) => task.dueDate && task.dueDate < now && task.status !== "Done"
  ).length;

  const byStatus = myTasks.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    },
    { Todo: 0, "In Progress": 0, Done: 0 }
  );

  return res.json({
    totalAssigned: myTasks.length,
    overdue: overdueCount,
    byStatus
  });
};

module.exports = {
  createTask,
  getProjectTasks,
  updateTask,
  deleteTask,
  getDashboardSummary
};
