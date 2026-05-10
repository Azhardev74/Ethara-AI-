const Project = require("../models/Project");

const requireProjectRole = (allowedRoles = ["Admin", "Member"]) => async (req, res, next) => {
  const projectId = req.params.id || req.params.projectId || req.body.projectId;
  if (!projectId) {
    return res.status(400).json({ message: "Project id is required" });
  }

  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const member = project.members.find((m) => m.user.toString() === req.user._id.toString());
  if (!member || !allowedRoles.includes(member.role)) {
    return res.status(403).json({ message: "Forbidden: insufficient role" });
  }

  req.project = project;
  req.projectRole = member.role;
  next();
};

module.exports = { requireProjectRole };
