const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Rotas da API
app.get('/items', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM items');
  res.json(rows);
});

app.post('/items', async (req, res) => {
  const { name } = req.body;
  const result = await pool.query('INSERT INTO items (name) VALUES ($1) RETURNING *', [name]);
  res.json(result.rows[0]);
});

app.put('/items/:id', async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  await pool.query('UPDATE items SET name = $1 WHERE id = $2', [name, id]);
  res.sendStatus(204);
});

app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM items WHERE id = $1');
  res.sendStatus(204);
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
