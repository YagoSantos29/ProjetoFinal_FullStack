import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import banco from "./database/dbConnection.js";


import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


banco.authenticate()
    .then(() => {
        console.log("Banco de dados conectado com sucesso!");
    })
    .catch((error) => {
        console.log("Erro ao conectar ao banco:", error);
    });


banco.sync()
    .then(() => {
        console.log("Tabelas sincronizadas!");
    })
    .catch((error) => {
        console.log(error);
    });


app.get("/", (req, res) => {
    res.json({
        mensagem: "API Sistema Escolar funcionando!"
    });
});


app.use("/auth", authRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});