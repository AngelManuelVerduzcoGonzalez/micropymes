const router = require('express').Router();
const ventasController = require('../controllers/ventasController');

// Obtener todas las ventas
router.get('/', (req, res) => {
    ventasController.getVentas(req, res);
});

// Obtener ventas por cliente
router.get('/cliente/:idCliente', (req, res) => {
    ventasController.getVentasByCliente(req, res);
});

// Obtener ventas por producto
router.get('/producto/:idProducto', (req, res) => {
    ventasController.getVentasByProducto(req, res);
});

// Obtener ventas por día
router.get('/dia/:fecha', (req, res) => {
    ventasController.getVentasByDay(req, res);
});

// Obtener ventas por mes
router.get('/mes/:fecha', (req, res) => {
    ventasController.getVentasByMonth(req, res);
});

// Obtener ventas por año
router.get('/ano/:year', (req, res) => {
    ventasController.getVentasByYear(req, res);
});

// Agregar una nueva venta
router.post('/', (req, res) => {
    ventasController.addVenta(req, res);
});

// Actualizar una venta
router.put('/:id', (req, res) => {
    ventasController.updateVenta(req, res);
});

// Eliminar una venta
router.delete('/:id', (req, res) => {
    ventasController.deleteVenta(req, res);
});

module.exports = router;
