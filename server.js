const express = require('express');
const dotenv = require("dotenv");
const connectDatabase = require('./helpers/database/connectDatabase');
const app = express();
const errorHandler = require("./middlewares/errors/errorHandler");
const routes = require('./routes/auth');
const path = require("path");
dotenv.config({path : "./configuration/env/config.env"});


connectDatabase();
app.use(express.json());
const PORT = process.env.PORT;
app.use("/api",routes);
app.use(errorHandler);

app.use(express.static(path.join(__dirname,"public")));

app.listen(PORT,()=>{
    console.log(`App started on : ${PORT}`);
})

