module.exports = {
    development: {
      client: "sqlite3",
      connection: {
        filename: "./database.sqlite", // Caminho para o banco de dados
      },
      useNullAsDefault: true,
    },
  };