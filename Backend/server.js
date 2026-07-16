import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import banco from "./database/dbConnection.js";


import "./models/index.js";


import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import enrollmentRoutes from "./routes/enrollmentsRoutes.js";
import gradeRoutes from "./routes/gradeRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//! CONECTA AO BANCO
banco.authenticate()
    .then(() => {
        console.log("Banco de dados conectado com sucesso!");
    })
    .catch((error) => {
        console.error(" Erro ao conectar ao banco:", error);
    });

//! SINCRONIZA AS TABELAS
banco.sync()
    .then(() => {
        console.log("Tabelas sincronizadas com sucesso!");
    })
    .catch((error) => {
        console.error("Erro ao sincronizar as tabelas:", error);
    });

//!ROTA INICIAL
app.get("/", (req, res) => {
    res.json({
        mensagem: "API Sistema Escolar funcionando!"
    });
});

//! ROTAS API
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/students", studentRoutes);
app.use("/classes", classRoutes);
app.use("/enrollments", enrollmentRoutes);
app.use("/grades", gradeRoutes);

//! SERVIDOR INICIA
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});