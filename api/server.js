const express = require("express");
const accountRouter = require("../accounts/accountRouter");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());
server.use("/api",accountRouter);

module.exports = server;
