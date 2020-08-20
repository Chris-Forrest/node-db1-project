
const router = require('express').Router();
const db = require("../data/dbConfig");


//const router = express.Router()

router.get("/", async (req,res) => {
    try{
        const accounts = await db.select("*").from("accounts")
        res.status(200).json(accounts)
    }catch(err){
        res.status(500).json({ message: "Could not retrieve accounts."})
    }
});

router.get("/:id", async (req,res) => {
    try{
        const [account] = await db.select("*").from("accounts").where("id",req.params.id).limit(1)
        res.json(account)
    }catch(err){
        res.status(500).json({ message:"Could not retrieve account."})
    }
});

router.post("/", async (req,res) => {
    try{
        const [id] = await db.insert({
            name: req.body.name,
            budget: req.body.budget,
        })
        .into("accounts")
        const account = await db("accounts")
        .where("id",id)
        .first()
        res.status(201).json(account)
    }catch(err){
        res.status(500).json({ message: "Could not add account"})
    }
});

router.put("/:id", async (req,res) => {
    try{
        await db("accounts").update({
            name: req.body.name,
            budget: req.body.budget,
        })
        .where("id", req.params.id)
        const account = await db("accounts")
        .where("id", req.params.id)
        .first()
        res.json(account)
    }catch(err){
        res.status(500).json({ message: " Could not edit account."})
    }
});

router.delete("/:id", async (req, res, next) => {
    try{
        await db("accounts")
            .where("id", req.params.id)
            .del()
        res.status(204).end()
    }catch(err){
        next(err)
    }
});

module.exports = router;