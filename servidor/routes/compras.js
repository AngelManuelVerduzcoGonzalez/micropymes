const router = require('express').Router()
const comprasController = require('../controllers/comprasController')

router.get('/', (req, res) => {
    comprasController.getCompras(req, res);
});

router.post('/', (req, res) => {
    comprasController.addCompras(req, res);
});

router.delete('/:id', (req, res) => {
    comprasController.deleteCompra(req, res);
});

router.put('/:id', (req, res) => {
    comprasController.updateCompra(req, res);
});

module.exports = router;