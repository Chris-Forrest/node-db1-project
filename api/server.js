const express = require("express");
const accountRouter = require("../accounts/accountRouter");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());
server.use(logger);
server.use("/api/accounts",accountRouter);

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: " Something went wrong"})
});

function logger( req, res, next){
    console.log(`${new Date().toISOString()} ${req.ip} ${req.method} ${req.url}`);

    next()
};

module.exports = server;
