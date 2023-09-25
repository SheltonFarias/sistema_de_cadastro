const { query } = require('../../database');
const { createContatos } = require('../../repositories/contatos-repository.js');

async function post(req, res) {
  const contatos = req.body;

  const { name, email, phone, category_id } = contatos;

  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ error: 'Name, email e telefone são obrigatórios.' });
  }
  // Validação do campo "email"
  if (email.length < 5 || email.length > 100) {
    return res
      .status(400)
      .json({ error: 'O campo "email" deve ter entre 5 e 100 caracteres.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Verifica o formato do email

  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ error: 'O campo "email" não está em um formato válido.' });
  }

  if (typeof phone === 'number') {
    phone = phone.toString();
  }

  const formattedPhone = phone
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
    .replace(/(-\d{4})\d+?$/, '$1');

  const obj = {
    text: 'INSERT INTO contatos(name, email, phone, category_id) VALUES($1, $2, $3, $4) RETURNING *',
    values: [name, email, formattedPhone, category_id],
  };
  try {
    const [contatoCriado] = await createContatos(obj);
    console.log(contatoCriado);
    return res.status(201).json(contatoCriado);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Ocorreu um erro ao criar o contato.' });
  }
}

module.exports = post;
