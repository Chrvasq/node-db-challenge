const db = require("../data/db-config");

module.exports = { find, findById, add };

function find() {
  return db("tasks as t")
    .join("projects as p", "t.project_id", "=", "p.id")
    .select(
      "t.id",
      "t.description as task_description",
      "t.completed",
      "p.project_name",
      "p.description as project_description"
    );
}

function findById(id) {
  return db("tasks")
    .where({ id })
    .first();
}

function add(task) {
  return db("tasks")
    .insert(task)
    .then(([id]) => this.findById(id));
}
