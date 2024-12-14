exports.up = function(knex) {
    return knex.schema.table("fiis", function(table) {
      // Verifique quais colunas realmente precisam ser adicionadas
      table.decimal("liquidez", 15, 2);
      table.integer("qtd_imoveis");
      table.decimal("vacancia_media", 5, 2);
      table.decimal("cotacao", 10, 2);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table("fiis", function(table) {
      table.dropColumn("qtd_imoveis");
      table.dropColumn("vacancia_media");
      table.dropColumn("cotacao");
    });
  };