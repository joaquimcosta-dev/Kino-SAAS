import "dotenv/config";
import express from "express";
import privado from "./src/router/privado.js";
import publica from "./src/router/publica.js";

//dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use("/", privado);
app.use("/index", publica);

app.listen(PORT, () => {
  console.log("O servidor esta no ar");
});
