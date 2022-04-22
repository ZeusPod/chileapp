const express = require("express");
const router = express.Router();
const user = require("../models/user");


//get all user  

router.get("/", (req, res) => {
    user.findall()
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));
});


//get use favorites
router.get("/:id/favorites", (req, res) =>{
    user.findById(req.params.id).populate("favorites")
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));
});


//add user favorites
router.post("/:id/favorites", (req, res) => {
    let data = user.findById(req.params.id)
    data.bidding.concat(req.body)
    data.save()
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));

});

//delete user favorites
router.delete("/:id/favorites/:bid", (req, res) => {
    let data = user.findById(req.params.id)
    data.bidding.pull(req.params.bid)
    data.save()
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));

});


module.exports = router;