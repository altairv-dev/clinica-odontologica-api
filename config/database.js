const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'clinica_odontologica'
});

// Testa a conexão ao iniciar a aplicação
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.code, '-', err.message);
    return;
  }
  console.log('Conectado ao banco de dados com sucesso.');
  connection.release();
});

module.exports = pool;
