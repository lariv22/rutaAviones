import { Sequelize } from "sequelize";

// npm install sequelize
// npm install mysql2

const db = new Sequelize('aviones', 'root', '666666', {
    host: "localhost",
    dialect: "mysql",
});

export default db; 