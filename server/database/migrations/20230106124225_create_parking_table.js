/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("parking", function (table) {
    table.increments("id");
    table.text("plate_number").notNullable();
    table.text("vehicle_type").notNullable();
    table
      .timestamp("time_in", {
        useTz: true,
      })
      .notNullable();
    table
      .timestamp("time_out", {
        useTz: true,
      })
      .notNullable();
    table.integer("fee").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("parking");
};
