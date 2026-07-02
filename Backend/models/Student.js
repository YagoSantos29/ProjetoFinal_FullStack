import { DataTypes } from "sequelize";
import banco from "../database/dbConnection.js";

const Student = banco.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    age:{
        type: DataTypes.INTEGER,
        allowNull: true
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

export default Student;