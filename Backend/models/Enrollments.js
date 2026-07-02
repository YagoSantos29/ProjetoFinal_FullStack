import { DataTypes } from "sequelize";
import banco from "../database/dbConnection.js";

const Enrollment = banco.define('Enrollment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

export default Enrollment;

