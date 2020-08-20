
const router = require('express').Router();
const db = require("../data/dbConfig");


//const router = express.Router()

router.get("/", async (req,res) => {
    try{
        const acounts = await db.select("*").from("accounts")
        res.status(200).json(accounts)
    }catch(err){
        res.status(500).json({ message: "Could not retrieve accounts."})
    }
})

module.exports = router;