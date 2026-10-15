const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const pacienteRoutes = require('./routes/pacienteRoutes');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ mensagem: 'API da Clínica Odontológica no ar.' });
});

app.use('/paciente', pacienteRoutes);

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

// Tratamento de erros gerais (inclui JSON malformado)
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON malformado no corpo da requisição.' });
  }
  console.error(err);
  return res.status(500).json({ erro: 'Erro interno do servidor.' });
});

module.exports = app;
