const { Sequelize, DataTypes } = require('sequelize');

// Configuración de la base de datos SQLite usando Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || './database.sqlite',
});

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuarios'
});

const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precio_costo: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    precio_venta: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idProveedor: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'productos'
});

const Cliente = sequelize.define('Cliente', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    domicilio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    puntos: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'clientes'
});

const Venta = sequelize.define('Venta', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio_venta: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    costo_total: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    tableName: 'ventas'
});

const Compra = sequelize.define('Compra', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idProveedor: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio_costo: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    costo_total: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    tableName: 'compras'
});

const Proveedor = sequelize.define('Proveedor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    domicilio: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'proveedores'
});

// Configuración de las asociaciones
Proveedor.hasMany(Producto, { foreignKey: 'idProveedor', onDelete: 'SET NULL' });
Producto.belongsTo(Proveedor, { foreignKey: 'idProveedor', onDelete: 'SET NULL' });

Venta.belongsTo(Cliente, { foreignKey: 'idCliente', onDelete: 'SET NULL' });
Venta.belongsTo(Producto, { foreignKey: 'idProducto', onDelete: 'SET NULL' });

Compra.belongsTo(Proveedor, { foreignKey: 'idProveedor', onDelete: 'SET NULL' });
Compra.belongsTo(Producto, { foreignKey: 'idProducto', onDelete: 'SET NULL' });

module.exports = {sequelize, Usuario, Producto, Cliente, Venta, Compra, Proveedor}