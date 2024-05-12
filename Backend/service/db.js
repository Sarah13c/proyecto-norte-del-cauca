const { Client } = require("pg");

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Backup_02',
  password: '1234',
  port: 5433,
});

// Conectar el cliente una vez al inicio
client.connect()
  .then(() => console.log('Conexión exitosa'))
  .catch(err => console.error('Error al conectar:', err));

module.exports = {
  client, // Exporta el cliente PostgreSQL conectado
};
