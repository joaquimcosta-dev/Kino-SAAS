import "dotenv/config";
import express from "express";
import router from "./src/router/privado.js";
import publica from "./src/router/publica.js";
import cors from "cors";


const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/", router);
app.use("/index", publica);

app.listen(PORT, () => {
  console.log("O servidor esta no ar");
});
