import { Sequelize, DataTypes } from 'sequelize';
import db from '../config/database.js';
import Ciudad from '../models/ciudadModel.js';

const Ruta = db.define('ruta', {
    idruta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    origen: {
        type: DataTypes.INTEGER,
        references: {
            model: 'ciudad', 
            key: 'id'
        }
    },
    destino: {
        type: DataTypes.INTEGER,
        references: {
            model: 'ciudad', 
            key: 'id'
        }
    },
    tiempo: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    animales: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    trafico: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Ruta;
