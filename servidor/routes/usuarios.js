const router = require('express').Router()
const usuariosController = require('../controllers/usuariosController');

router.get('/:username/:password', (req, res) => {
    usuariosController.getUsuario(req, res);
})

router.post('/', (req, res) => {
    usuariosController.addUsuario(req, res);
})

module.exports = router;