import { DataTypes } from "sequelize";
import banco from "../database/dbConnection.js";

const User = banco.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,

    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    role: {
        type: DataTypes.ENUM("admin", "professor", "aluno"),
        allowNull: false
    }
});

export default User;