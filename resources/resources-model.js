const db = require("../data/db-config");

module.exports = { find, findById, add };

function find() {
  return db("resources");
}

function findById(id) {
  return db("resources")
    .where({ id })
    .first();
}

function add(resource) {
  return db("resources")
    .insert(resource)
    .then(([id]) => this.findById(id));
}
