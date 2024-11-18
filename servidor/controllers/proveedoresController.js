const { Proveedor } = require('../lib/db')

module.exports = {
    getProveedores: async (req, res) => {
        try {
            const proveedores = await Proveedor.findAll();
            res.status(200).json(proveedores);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los proveedores: ' + error.message });
        }
    },
    addProveedor: async (req, res) => {
        try {
            const nuevoProveedor = await Proveedor.create(req.body);
            res.status(201).json(nuevoProveedor);
        } catch (error) {
            res.status(500).json({error: 'Error al agregar el proveedor: ' + error.message})
        }
    },
    deleteProveedor: async (req, res) => {
        const { id } = req.params;
        try {
            const proveedor = await Proveedor.findByPk(id)
            if (!proveedor) {
                res.status(404).json({ message: 'Proveedor no encontrado' });
            }
            await proveedor.destroy()
            res.status(200).json({ message: 'Proveedor eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({error: 'Error al eliminar el proveedor: ' + error.message})
        }
    },
    updateProveedor: async (req, res) => {
        const { id } = req.params;
        try {
            const proveedor = await Proveedor.findByPk(id);
            if (!proveedor) {
                res.status(404).json({ message: 'Proveedor no encontrado' });
            }
            const proveedorActualizado = await proveedor.update(req.body);
            res.status(200).json(proveedorActualizado);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el proveedor: ' + error.message });
        }
    }
}