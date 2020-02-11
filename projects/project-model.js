const db = require("../data/db-config");

module.exports = { find, findById, add };

function find() {
  return db("projects").then(projects => {
    return projects.map(project => ({
      ...project,
      completed: project.completed === 1 ? true : false
    }));
  });
}

function findById(id) {
  return db("projects")
    .where({ id })
    .first()
    .then(project => ({
      ...project,
      completed: project.completed === 1 ? true : false
    }));
}

function add(project) {
  return db("projects")
    .insert(project)
    .then(([id]) => this.findById(id));
}
