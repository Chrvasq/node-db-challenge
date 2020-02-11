const express = require("express");
const Projects = require("./project-model");
const Tasks = require("../tasks/tasks-model");
const router = express.Router();

// GET projects
router.get("/", (req, res) => {
  Projects.find()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(() => {
      res.status(500).json({ message: "Failed to get projects." });
    });
});

// POST project
router.post("/", validateProject, (req, res) => {
  const { project } = req;

  Projects.add(project)
    .then(newProject => res.status(200).json(newProject))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Exception", err });
    });
});

// POST task
router.post("/:id/tasks", validateProjectId, validateTask, (req, res) => {
  const { project, task } = req;
  const newTask = { ...task, project_id: project.id };

  Tasks.add(newTask)
    .then(tsk => res.status(200).json({ ...tsk }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Exception", err });
    });
});

// custom middleware

function validateProject(req, res, next) {
  const { project_name } = req.body;

  // check if body isn't empty
  Object.keys(req.body).length !== 0
    ? // check if project_name property exists
      !project_name
      ? res.status(400).json({ errorMessage: "Missing project name." })
      : ((req.project = { ...req.body }), next())
    : res.status(400).json({ errorMessage: "Missing required data." });
}

function validateTask(req, res, next) {
  const { description } = req.body;

  // check if body isn't empty
  Object.keys(req.body).length !== 0
    ? // check if description property exists
      !description
      ? res.status(400).json({ errorMessage: "Missing task description." })
      : ((req.task = { ...req.body }), next())
    : res.status(400).json({ errorMessage: "Missing required data." });
}

function validateProjectId(req, res, next) {
  const { id } = req.params;

  Projects.findById(id)
    .then(project => {
      // check if project exists
      project
        ? ((req.project = project), next())
        : res.status(404).json({ message: `Project ID ${id} not found` });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Exception", err });
    });
}

module.exports = router;
