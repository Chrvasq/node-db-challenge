exports.up = function(knex) {
  return knex.schema
    .createTable("projects", project => {
      project.increments();
      project
        .text("project_name")
        .notNullable()
        .unique();
      project.text("description");
      project.boolean("completed");
    })
    .createTable("tasks", task => {
      task.increments();
      task.text("description").notNullable();
      task.text("notes");
      task.boolean("completed");
      task
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("resources", resource => {
      resource.increments();
      resource
        .text("name")
        .notNullable()
        .unique();
      resource.text("description");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("projects");
};
