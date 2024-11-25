const router = require('express').Router()
const clientesController = require('../controllers/clientesController');

router.get('/', (req, res) => {
    clientesController.getClientes(req, res);
});

router.get('/:id', (req, res) => {
    clientesController.getClienteId(req, res);
});

router.post('/', (req, res) => {
    clientesController.addCliente(req, res);
});

router.delete('/:id', (req, res) => {
    clientesController.deleteCliente(req, res);
});

router.put('/:id', (req, res) => {
    clientesController.updateCliente(req, res);
});

module.exports = router;