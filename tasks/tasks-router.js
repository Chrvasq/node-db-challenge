const express = require("express");
const Tasks = require("../tasks/tasks-model");
const router = express.Router();

router.get("/", (req, res) => {
  Tasks.find()
    .then(tasks => res.status(200).json(tasks))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get tasks." });
    });
});

module.exports = router;
