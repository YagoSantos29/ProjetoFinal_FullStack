import { DataTypes } from "sequelize";
import banco from "../database/dbConnection.js";

const Enrollment = banco.define("Enrollment", {
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
    }
});

export default Enrollment;