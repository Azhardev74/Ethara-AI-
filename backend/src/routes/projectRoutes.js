const express = require("express");
const { body } = require("express-validator");
const {
  createProject,
  getMyProjects,
  getProjectById,
  updateProject,
  addMember,
  removeMember
} = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");
const { requireProjectRole } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(
    [body("name").trim().notEmpty().withMessage("Project name is required")],
    createProject
  )
  .get(getMyProjects);

router.get("/:id", getProjectById);

router.put("/:id", requireProjectRole(["Admin"]), updateProject);

router.post(
  "/:id/members",
  requireProjectRole(["Admin"]),
  [
    body("email").isEmail().withMessage("Valid member email is required"),
    body("role")
      .optional()
      .isIn(["Admin", "Member"])
      .withMessage("Role must be Admin or Member")
  ],
  addMember
);

router.delete("/:id/members/:userId", requireProjectRole(["Admin"]), removeMember);

module.exports = router;
