const express = require("express");
const Resources = require("./resources-model");
const router = express.Router();

// GET resources
router.get("/", (req, res) => {
  Resources.find()
    .then(resources => res.status(200).json(resources))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get resources." });
    });
});

// POST resource
router.post("/", validateResource, (req, res) => {
  const { resource } = req;

  Resources.add(resource)
    .then(newResource => res.status(200).json(newResource))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Exception", err });
    });
});

// middleware
function validateResource(req, res, next) {
  const { name } = req.body;

  // check if body isn't empty
  Object.keys(req.body).length !== 0
    ? // check if name property exists
      !name
      ? res.status(400).json({ errorMessage: "Missing resource name." })
      : ((req.resource = {
          ...req.body
        }),
        next())
    : res.status(400).json({ errorMessage: "Missing required data." });
}

module.exports = router;
