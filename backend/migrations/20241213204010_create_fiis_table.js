exports.up = function (knex) {
    return knex.schema.createTable("fiis", function (table) {
      table.increments("id").primary();
      table.string("code").notNullable();
      table.string("segment").notNullable();
      table.float("dividendYield");
      table.float("pvp");
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("fiis");
  };