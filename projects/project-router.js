const express = require("express");
const Projects = require("./project-model");
const router = express.Router();

router.get("/", (req, res) => {
  Projects.find()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(() => {
      res.status(500).json({ message: "Failed to get projects." });
    });
});

router.post("/", validateProject, (req, res) => {
  const { project } = req;

  Projects.add(project)
    .then(newProject => res.status(200).json(newProject))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Exception", err });
    });
});

// custom middleware

function validateProject(req, res, next) {
  const { project_name } = req.body;
  const completed = req.body.completed ? req.body.completed : "false";

  Object.keys(req.body).length !== 0
    ? !project_name
      ? res.status(400).json({ errorMessage: "Missing project name." })
      : ((req.project = {
          ...req.body,
          project_name: project_name,
          completed: completed
        }),
        next())
    : res.status(400).json({ errorMessage: "Missing required data." });
}

module.exports = router;
