
const router = require('express').Router();
const db = require("../data/dbConfig");


//const router = express.Router()

router.get("/", async (req,res, next ) => {
    try{
       // const accounts = await db.select("*").from("accounts")
       const accounts = await db("accounts")
                                .limit(req.query.limit || 20)
                                .orderBy(req.query.sortby || "id")
        res.status(200).json(accounts)
    }catch(err){
        //res.status(500).json({ message: "Could not retrieve accounts."})
        next(err)
    }
});

router.get("/:id", async (req,res, next) => {
    try{
        const [account] = await db.select("*").from("accounts").where("id",req.params.id).limit(1)
        res.json(account)
    }catch(err){
       // res.status(500).json({ message:"Could not retrieve account."})
       next(err)
    }
});

router.post("/", async (req,res, next) => {
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
       // res.status(500).json({ message: "Could not add account"})
       next(err)
    }
});

router.put("/:id", async (req,res, next) => {
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
       // res.status(500).json({ message: " Could not edit account."})
       next(err)
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