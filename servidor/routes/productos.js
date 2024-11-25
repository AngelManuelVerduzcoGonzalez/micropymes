const router = require('express').Router()
const productosController = require('../controllers/productosController')

router.get('/', (req, res) => {
    productosController.getProductos(req, res);
});

router.get('/:id', (req, res) => {
    productosController.getProductoId(req, res);
});

router.get('/proveedor/:idProveedor', (req, res) => {
    productosController.getProductosByProveedor(req, res);
})

router.post('/', (req, res) => {
    productosController.addProducto(req, res);
});

router.delete('/:id', (req, res) => {
    productosController.deleteProducto(req, res);
});

router.put('/:id', (req, res) => {
    productosController.updateProducto(req, res);
})

module.exports = router;