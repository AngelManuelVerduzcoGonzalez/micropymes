const router = require('express').Router()
const proveedoresController = require('../controllers/proveedoresController')

router.get('/', (req, res) => {
    proveedoresController.getProveedores(req, res);
});

router.post('/', (req, res) => {
    proveedoresController.addProveedor(req, res);
});

router.delete('/:id', (req, res) => {
    proveedoresController.deleteProveedor(req, res);
});

router.put('/:id', (req, res) => {
    proveedoresController.updateProveedor(req, res);
});

module.exports = router;