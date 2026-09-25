require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require(".routes/authRoutes");

const {poolPromise} = require("./BD");

const app= express();
const PORT = 5000;

app.use(express.json());
app.use(morgan("dev"));

app.use('/users', userRoutes);
app.use('/', authRoutes);

app.get("/", (req, res) => {
    res.send("api funciona :3");
});

app.get("/marco", (req, res) => {
    res.send("hola marco :p");
});

app.get("/ping", (req, res) => {
    res.json({
        mensaje: "pong :D"
    })
});

app.listen(PORT, () => {
    console.log("server ya funcionando :3 esta en: http://localhost:5000")
})