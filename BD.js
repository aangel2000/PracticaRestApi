const sql = require ("mssql");
require("dotenv").config;

console.log("Puerto:", process.env.DB_PORT);
console.log("Puerto convertido:", Number(process.env.DB_PORT));

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    option:{
        encrypt:false,
        trustServerCertificate: true
    }
};

const poolPromise= new sql.ConnectionPool(config)
    .connect()
    .then(pool=>{
        console.log("disque conectado al sql");
        return pool;
    })
    .catch(err =>{
        console.error("exploto :c", err)
    })

module.exports = {sql, poolPromise};