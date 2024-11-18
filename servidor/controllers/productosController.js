const { Producto, Proveedor } = require('../lib/db');

module.exports = {
    // Obtener todos los productos
    getProductos: async (req, res) => {
        try {
            const productos = await Producto.findAll({
                include: {
                    model: Proveedor,
                    attributes: ['nombre'] // Opcional: incluir solo el nombre del proveedor
                }
            });
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los productos: ' + error.message });
        }
    },

    // Obtener productos por proveedor
    getProductosByProveedor: async (req, res) => {
        const { idProveedor } = req.params;
        try {
            const productos = await Producto.findAll({
                where: { idProveedor },
                include: {
                    model: Proveedor,
                    attributes: ['nombre']
                }
            });
            if (productos.length === 0) {
                return res.status(404).json({ message: 'No se encontraron productos para este proveedor' });
            }
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener productos por proveedor: ' + error.message });
        }
    },

    // Agregar un nuevo producto
    addProducto: async (req, res) => {
        try {
            const nuevoProducto = await Producto.create(req.body);
            res.status(201).json(nuevoProducto);
        } catch (error) {
            res.status(500).json({ error: 'Error al agregar el producto: ' + error.message });
        }
    },

    // Eliminar un producto
    deleteProducto: async (req, res) => {
        const { id } = req.params;
        try {
            const producto = await Producto.findByPk(id);
            if (!producto) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            await producto.destroy();
            res.status(200).json({ message: 'Producto eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el producto: ' + error.message });
        }
    },

    // Actualizar un producto
    updateProducto: async (req, res) => {
        const { id } = req.params;
        try {
            const producto = await Producto.findByPk(id);
            if (!producto) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            const productoActualizado = await producto.update(req.body);
            res.status(200).json(productoActualizado);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el producto: ' + error.message });
        }
    }
};
