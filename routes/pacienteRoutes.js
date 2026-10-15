const express = require('express');
const db = require('../config/database');

const router = express.Router();

// Validação simples dos campos do body
function camposValidos(body) {
  const { nome, telefone, procedimento } = body || {};
  return [nome, telefone, procedimento].every(
    (campo) => typeof campo === 'string' && campo.trim().length > 0
  );
}

// Valida o parâmetro :id
function idValido(id) {
  return /^\d+$/.test(id) && Number(id) > 0;
}

// GET /paciente -> lista todos
router.get('/', (req, res) => {
  const sql = 'SELECT id, nome, telefone, procedimento FROM paciente ORDER BY id';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao listar pacientes:', err);
      return res.status(500).json({ erro: 'Erro interno ao listar pacientes.' });
    }
    return res.status(200).json(results);
  });
});

// GET /paciente/:id -> busca por id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  if (!idValido(id)) {
    return res.status(400).json({ erro: 'ID inválido.' });
  }

  const sql = 'SELECT id, nome, telefone, procedimento FROM paciente WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar paciente:', err);
      return res.status(500).json({ erro: 'Erro interno ao buscar paciente.' });
    }
    if (results.length === 0) {
      return res.status(404).json({ erro: 'Paciente não encontrado.' });
    }
    return res.status(200).json(results[0]);
  });
});

// POST /paciente -> cria
router.post('/', (req, res) => {
  if (!camposValidos(req.body)) {
    return res.status(400).json({
      erro: 'Campos obrigatórios: nome, telefone e procedimento.'
    });
  }

  const { nome, telefone, procedimento } = req.body;
  const sql = 'INSERT INTO paciente (nome, telefone, procedimento) VALUES (?, ?, ?)';

  db.query(sql, [nome.trim(), telefone.trim(), procedimento.trim()], (err, result) => {
    if (err) {
      console.error('Erro ao criar paciente:', err);
      return res.status(500).json({ erro: 'Erro interno ao criar paciente.' });
    }
    return res.status(201).json({
      mensagem: 'Paciente criado com sucesso.',
      paciente: {
        id: result.insertId,
        nome: nome.trim(),
        telefone: telefone.trim(),
        procedimento: procedimento.trim()
      }
    });
  });
});

// PUT /paciente/:id -> atualiza
router.put('/:id', (req, res) => {
  const { id } = req.params;

  if (!idValido(id)) {
    return res.status(400).json({ erro: 'ID inválido.' });
  }
  if (!camposValidos(req.body)) {
    return res.status(400).json({
      erro: 'Campos obrigatórios: nome, telefone e procedimento.'
    });
  }

  const { nome, telefone, procedimento } = req.body;
  const sql = 'UPDATE paciente SET nome = ?, telefone = ?, procedimento = ? WHERE id = ?';

  db.query(sql, [nome.trim(), telefone.trim(), procedimento.trim(), id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar paciente:', err);
      return res.status(500).json({ erro: 'Erro interno ao atualizar paciente.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Paciente não encontrado.' });
    }
    return res.status(200).json({
      mensagem: 'Paciente atualizado com sucesso.',
      paciente: {
        id: Number(id),
        nome: nome.trim(),
        telefone: telefone.trim(),
        procedimento: procedimento.trim()
      }
    });
  });
});

// DELETE /paciente/:id -> remove
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  if (!idValido(id)) {
    return res.status(400).json({ erro: 'ID inválido.' });
  }

  const sql = 'DELETE FROM paciente WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao remover paciente:', err);
      return res.status(500).json({ erro: 'Erro interno ao remover paciente.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Paciente não encontrado.' });
    }
    return res.status(200).json({ mensagem: 'Paciente removido com sucesso.' });
  });
});

module.exports = router;
