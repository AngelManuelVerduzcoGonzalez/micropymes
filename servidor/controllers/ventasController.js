const { Venta, Cliente, Producto } = require('../lib/db');
const { Op } = require('sequelize');

module.exports = {
    // Obtener todas las ventas
    getVentas: async (req, res) => {
        try {
            const ventas = await Venta.findAll({
                include: [Cliente, Producto] // Incluye información de Cliente y Producto relacionados
            });
            res.status(200).json(ventas);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las ventas: ' + error.message });
        }
    },

    // Obtener ventas por cliente
    getVentasByCliente: async (req, res) => {
        const { idCliente } = req.params;
        try {
            const ventas = await Venta.findAll({
                where: { idCliente },
                include: [Producto] // Incluye información del producto relacionado
            });
            res.status(200).json(ventas);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las ventas por cliente: ' + error.message });
        }
    },

    // Obtener ventas por producto
    getVentasByProducto: async (req, res) => {
        const { idProducto } = req.params;
        try {
            const ventas = await Venta.findAll({
                where: { idProducto },
                include: [Cliente] // Incluye información del cliente relacionado
            });
            res.status(200).json(ventas);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las ventas por producto: ' + error.message });
        }
    },

    // Obtener ventas por día
    getVentasByDay: async (req, res) => {
        const { fecha } = req.params; // Fecha en formato YYYY-MM-DD
        try {
            const ventas = await Venta.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: `${fecha} 00:00:00`,
                        [Op.lt]: `${fecha} 23:59:59`
                    }
                },
                include: [Cliente, Producto]
            });
            res.status(200).json(ventas);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las ventas por día: ' + error.message });
        }
    },

    // Obtener ventas por mes
    getVentasByMonth: async (req, res) => {
        const { year, month } = req.params; // Año y mes en formato YYYY-MM
        try {
            const ventas = await Venta.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: `${year}-${month}-01`,
                        [Op.lt]: `${year}-${month}-31`
                    }
                },
                include: [Cliente, Producto]
            });
            res.status(200).json(ventas);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las ventas por mes: ' + error.message });
        }
    },

    // Obtener ventas por año
    getVentasByYear: async (req, res) => {
        const { year } = req.params; // Año en formato YYYY
        try {
            const ventas = await Venta.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: `${year}-01-01`,
                        [Op.lt]: `${year}-12-31`
                    }
                },
                include: [Cliente, Producto]
            });
            res.status(200).json(ventas);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las ventas por año: ' + error.message });
        }
    },

    // Agregar una nueva venta
    addVenta: async (req, res) => {
        try {
            const nuevaVenta = await Venta.create(req.body);
            res.status(201).json(nuevaVenta);
        } catch (error) {
            res.status(500).json({ error: 'Error al agregar la venta: ' + error.message });
        }
    },

    // Eliminar una venta
    deleteVenta: async (req, res) => {
        const { id } = req.params;
        try {
            const venta = await Venta.findByPk(id);
            if (!venta) {
                return res.status(404).json({ message: 'Venta no encontrada' });
            }
            await venta.destroy();
            res.status(200).json({ message: 'Venta eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar la venta: ' + error.message });
        }
    },

    // Actualizar una venta
    updateVenta: async (req, res) => {
        const { id } = req.params;
        try {
            const venta = await Venta.findByPk(id);
            if (!venta) {
                return res.status(404).json({ message: 'Venta no encontrada' });
            }
            const ventaActualizada = await venta.update(req.body);
            res.status(200).json(ventaActualizada);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la venta: ' + error.message });
        }
    }
};
