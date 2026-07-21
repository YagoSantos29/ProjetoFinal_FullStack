import { DataTypes } from "sequelize";
import banco from "../database/dbConnection.js";

const Student = banco.define("Student", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    registration: {
        type: DataTypes.STRING,
        allowNull: false
    },

    age: {
        type: DataTypes.INTEGER
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Student;