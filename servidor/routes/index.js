const express = require('express')
const router = express.Router();

const usuarios = require('./usuarios.js');
const productos = require('./productos.js');
const clientes = require('./clientes.js');
const compras = require('./compras.js');
const proveedores = require('./proveedores.js');

router.use('/usuarios', usuarios);
router.use('/productos', productos);
router.use('/clientes', clientes);
router.use('/compras', compras);
router.use('/proveedores', proveedores);

module.exports = router