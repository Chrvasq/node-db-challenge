const db = require("../data/db-config");

module.exports = { find, findById, add };

function find() {
  return db("projects");
}

function findById(id) {
  return db("projects")
    .where({ id })
    .first();
}

function add(project) {
  return db("projects")
    .insert(project)
    .then(([id]) => this.findById(id));
}
