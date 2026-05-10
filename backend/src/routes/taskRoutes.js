const express = require("express");
const { body } = require("express-validator");
const {
  createTask,
  getProjectTasks,
  updateTask,
  deleteTask,
  getDashboardSummary
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/dashboard/summary", getDashboardSummary);
router.get("/project/:projectId", getProjectTasks);
router.post(
  "/",
  [
    body("title").trim().notEmpty().withMessage("Task title is required"),
    body("projectId").notEmpty().withMessage("Project id is required"),
    body("assignedTo").notEmpty().withMessage("Assignee id is required"),
    body("status")
      .optional()
      .isIn(["Todo", "In Progress", "Done"])
      .withMessage("Invalid status")
  ],
  createTask
);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
