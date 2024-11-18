const { Compra, Proveedor, Producto } = require('../lib/db');
const { Op } = require('sequelize');

module.exports = {
    // Obtener todas las compras
    getCompras: async (req, res) => {
        try {
            const compras = await Compra.findAll({
                include: [Proveedor, Producto] // Incluye información de Proveedor y Producto relacionados
            });
            res.status(200).json(compras);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las compras: ' + error.message });
        }
    },

    // Agregar una nueva compra
    addCompras: async (req, res) => {
        try {
            const nuevaCompra = await Compra.create(req.body);
            res.status(201).json(nuevaCompra);
        } catch (error) {
            res.status(500).json({ error: 'Error al agregar la compra: ' + error.message });
        }
    },

    // Eliminar una compra
    deleteCompra: async (req, res) => {
        const { id } = req.params;
        try {
            const compra = await Compra.findByPk(id);
            if (!compra) {
                return res.status(404).json({ message: 'Compra no encontrada' });
            }
            await compra.destroy();
            res.status(200).json({ message: 'Compra eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar la compra: ' + error.message });
        }
    },

    // Actualizar una compra
    updateCompra: async (req, res) => {
        const { id } = req.params;
        try {
            const compra = await Compra.findByPk(id);
            if (!compra) {
                return res.status(404).json({ message: 'Compra no encontrada' });
            }
            const compraActualizada = await compra.update(req.body);
            res.status(200).json(compraActualizada);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la compra: ' + error.message });
        }
    }
};
