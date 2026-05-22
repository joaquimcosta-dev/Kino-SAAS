import mysql from "mysql2/promise";
let db;
try {
    db = mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB,
        waitForConnections: true
    });
    console.log("conectado com sucesso");
} catch (e) {
    console.log("Erro ao tentar conectar o banco: ", e);
}

export default db;
