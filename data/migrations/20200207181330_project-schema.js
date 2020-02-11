exports.up = function(knex) {
  return knex.schema
    .createTable("projects", project => {
      project.increments();
      project
        .text("project_name")
        .notNullable()
        .unique();
      project.text("description");
      project
        .boolean("completed")
        .notNullable()
        .defaultTo(false);
    })
    .createTable("tasks", task => {
      task.increments();
      task.text("description").notNullable();
      task.text("notes");
      task
        .boolean("completed")
        .notNullable()
        .defaultTo(false);
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
    })
    .createTable("projects_resources", project_resource => {
      project_resource
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      project_resource
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("resources")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("projects_resources")
    .dropTableIfExists("resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("projects");
};
