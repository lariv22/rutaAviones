import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Notes = db.define('notas',{
    titulo:{
        type: DataTypes.STRING
    },
    descripcion:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
    createdAt : false,
    updatedAt: false
});

(async () => {
    await db.sync();
})();

export default Notes;