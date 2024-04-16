import { Sequelize, DataTypes } from 'sequelize';
import db from '../config/database.js';

const Ciudad = db.define('ciudad', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Ciudad;
