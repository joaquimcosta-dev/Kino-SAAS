import mysql from 'mysql2/promise'

let db;

try {
    
 db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"kino_database",
    waitForConnections:true
})

console.log("conectado com sucesso");

} catch (e) {
    console.log("Erro ao tentar conectar o banco: ",e);
    
}

export default db;