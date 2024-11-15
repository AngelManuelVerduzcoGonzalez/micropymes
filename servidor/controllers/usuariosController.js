const { Usuario, sequelize } = require('../lib/db.js');

module.exports = {
    getUsuario: async (req, res) => {
        try {
            const usuario = await Usuario.findAll({
                where: {
                    username: req.params.username,
                    password: req.params.password
                }    
            });
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el usuario' });
        }
    },
    addUsuario: async (req, res) => {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ error: 'Faltan datos obligatorios (username, password o email)' });
        }

        try {
            const usuario = await Usuario.create({ username, password, email });
            res.status(201).json(usuario);
        } catch (error) {
            res.status(500).json({ error: 'Error al agregar el usuario: ' + error.message });
        }
    }

}

