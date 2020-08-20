
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
})

router.get("/:id", async (req,res) => {
    try{
        const [account] = await db.select("*").from("accounts").where("id",req.params.id).limit(1)
        res.json(account)
    }catch(err){
        res.status(500).json({ message:"Could not retrieve account."})
    }
})

module.exports = router;