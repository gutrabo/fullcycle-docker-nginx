const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

const PORT = 3000;

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'app',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'appdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/', async (_req, res) => {
    try {
        await pool.query('insert into nomes (nome) values (?)', ['Jeronimo'])

        const [rows] = await pool.query('SELECT nome FROM nomes ORDER BY id DESC');
        const list = rows.map(r => `<li>${r.nome}</li>`).join('');
        const html = `
        <h1>Full Cycle Rocks!</h1>
        <ul>${list}</ul>`;

         res.type('html').send(html);
    } catch (error) {
        console.error(err);
        res.status(500).send('db error');
    }
});

app.listen(PORT, () => {
  console.log(`Server (Express) em http://localhost:${PORT}`);
});