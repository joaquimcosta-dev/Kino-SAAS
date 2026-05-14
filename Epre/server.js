import express from "express";
import mysql from "mysql2";
import router from "./src/router/privado.js";
import publica from "./src/router/publica.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use("/", router);
app.use("/index", publica);

app.listen(PORT, () => {
  console.log("O servidor esta no ar");
});
