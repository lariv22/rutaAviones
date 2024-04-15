import { Sequelize } from "sequelize";

// npm install sequelize
// npm install mysql2

const db = new Sequelize('tutorialnode', 'root', 'kikyo@12', {
    host: "localhost",
    dialect: "mysql",
});

export default db;