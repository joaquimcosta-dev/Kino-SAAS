import express from "express";
import mysql from "mysql2";
import router from "./src/router/privado.js";
import publica from "./src/router/publica.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/",router)
app.use("/index",publica);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
    }
})

app.listen(process.env.PORT, () => {
    console.log("O servidor esta no ar")
});
