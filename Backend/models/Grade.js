import { DataTypes } from "sequelize";
import banco from "../database/dbConnection.js";

const Grade = banco.define("Grade", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    classId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    grade: {
        type: DataTypes.FLOAT,
        allowNull: false
    }

});

export default Grade;