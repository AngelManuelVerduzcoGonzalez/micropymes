const { Cliente } = require('../lib/db');

module.exports = {
    // Obtener todos los clientes
    getClientes: async (req, res) => {
        try {
            const clientes = await Cliente.findAll();
            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los clientes: ' + error.message });
        }
    },

    // Agregar un nuevo cliente
    addCliente: async (req, res) => {
        try {
            const nuevoCliente = await Cliente.create(req.body);
            res.status(201).json(nuevoCliente);
        } catch (error) {
            res.status(500).json({ error: 'Error al agregar el cliente: ' + error.message });
        }
    },

    // Eliminar un cliente
    deleteCliente: async (req, res) => {
        const { id } = req.params;
        try {
            const cliente = await Cliente.findByPk(id);
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente no encontrado' });
            }
            await cliente.destroy();
            res.status(200).json({ message: 'Cliente eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el cliente: ' + error.message });
        }
    },

    // Actualizar un cliente
    updateCliente: async (req, res) => {
        const { id } = req.params;
        try {
            const cliente = await Cliente.findByPk(id);
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente no encontrado' });
            }
            const clienteActualizado = await cliente.update(req.body);
            res.status(200).json(clienteActualizado);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el cliente: ' + error.message });
        }
    }
};
