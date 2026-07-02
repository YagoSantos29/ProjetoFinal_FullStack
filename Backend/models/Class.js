import { DataTypes } from "sequelize"; 
import banco from "../database/dbConnection.js";

const Class = banco.define('Class', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Class;