const { validationResult } = require("express-validator");
const Project = require("../models/Project");
const User = require("../models/User");

const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Validation failed", errors: errors.array() });
  }

  const { name, description } = req.body;
  const project = await Project.create({
    name,
    description,
    owner: req.user._id,
    members: [{ user: req.user._id, role: "Admin" }]
  });

  return res.status(201).json(project);
};

const getMyProjects = async (req, res) => {
  const projects = await Project.find({ "members.user": req.user._id })
    .populate("members.user", "name email")
    .sort({ createdAt: -1 });
  return res.json(projects);
};

const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id).populate("members.user", "name email");
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const isMember = project.members.some((m) => m.user._id.toString() === req.user._id.toString());
  if (!isMember) {
    return res.status(403).json({ message: "Forbidden: not a project member" });
  }

  return res.json(project);
};

const updateProject = async (req, res) => {
  const project = req.project;
  const { name, description } = req.body;
  project.name = name ?? project.name;
  project.description = description ?? project.description;
  await project.save();
  return res.json(project);
};

const addMember = async (req, res) => {
  const { email, role } = req.body;
  const project = req.project;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found by email" });
  }

  const exists = project.members.some((m) => m.user.toString() === user._id.toString());
  if (exists) {
    return res.status(400).json({ message: "User is already a project member" });
  }

  project.members.push({ user: user._id, role: role || "Member" });
  await project.save();
  await project.populate("members.user", "name email");
  return res.json(project);
};

const removeMember = async (req, res) => {
  const project = req.project;
  const memberId = req.params.userId;

  if (project.owner.toString() === memberId) {
    return res.status(400).json({ message: "Project owner cannot be removed" });
  }

  project.members = project.members.filter((m) => m.user.toString() !== memberId);
  await project.save();
  await project.populate("members.user", "name email");
  return res.json(project);
};

module.exports = {
  createProject,
  getMyProjects,
  getProjectById,
  updateProject,
  addMember,
  removeMember
};
