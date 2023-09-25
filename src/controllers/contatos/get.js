const { showContatos } = require('../../repositories/contatos-repository.js');

async function get(req, res) {
  try {
    const { name } = req.query;

    const contatos = await showContatos({ name });

    return res.json(contatos);
  } catch (error) {
    console.error('Erro ao consultar registro:', error);
    res.status(500).json({ error: 'Erro ao consultar registro' });
  }
}

module.exports = get;
