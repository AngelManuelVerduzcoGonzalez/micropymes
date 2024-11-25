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

    getClienteId: async (req, res) => {
        const { id } = req.params;
        try {
            const cliente = await Cliente.findByPk(id);
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente no encontrado' });
            }
            res.status(200).json(cliente);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el cliente: ' + error.message });
        }
    },

    // Agregar un nuevo cliente
    addCliente: async (req, res) => {
        try {
            const { nombre, telefono, domicilio, puntos, correo } = req.body;

            // Validaciones adicionales (opcional)
            if (!nombre || !telefono || !domicilio || !correo) {
                return res.status(400).json({ error: 'Faltan campos obligatorios' });
            }

            const cliente = await Cliente.create({ nombre, telefono, domicilio, puntos, correo });
            res.status(201).json(cliente);
        } catch (error) {
            console.error('Error al agregar el cliente:', error);
            res.status(500).json({ error: 'Error al agregar el cliente', details: error.message });
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
