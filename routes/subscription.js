var express = require("express");
var bodyparser = require("body-parser");
const Subscription = require("../models/Subscription")
const router = express.Router();                    // Creates sub-server

router.post("/save", async (req, res) => {
    let body = req.body;
    let product = new Subscription();
    if (body.data.id != "") {
        product = await Subscription.findById(body.data.id);
    }
    product.email = body.data.email;
    
    product.save().then(result => {
        res.end(JSON.stringify(result));

    }, err => {
        res.end(JSON.stringify(err));
        console.log(err);
    });
});

router.post("/list", async (req, res) => {
    let subscription = await Subscription.find();
    res.json({ data: subscription });
})


module.exports = router;