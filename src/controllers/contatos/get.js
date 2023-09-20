const { query } = require('../../database');

async function get(req, res) {
    try {
        const { name } = req.query;

        // Construa a consulta SQL com base no parâmetro 'name'
        let sql = 'SELECT * FROM contatos';

        if (name) {
            sql += ' WHERE nome LIKE $1';
        }

        // Execute a consulta SQL e passe o parâmetro seguro
        const contatos = await query(sql, name ? [`%${name}%`] : []);

        return res.json(contatos);
    } catch (error) {
        console.error('Erro ao consultar registro:', error);
        res.status(500).json({ error: 'Erro ao consultar registro' });
    }
}

module.exports = get;