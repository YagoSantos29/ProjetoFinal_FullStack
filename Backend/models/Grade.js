import { DataTypes } from "sequelize";
import banco from "../database/dbConnection.js";

const Grade = banco.define('Grade', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    grade: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

export default Grade;