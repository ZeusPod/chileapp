const express = require("express");
const itemSchema = require("../models/item");
const router = express.Router();
const item = require("../models/item");

//create item
router.post("/", (req, res) => {
    const item = itemSchema(req.body);
    item
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));
});

//get all items
router.get("/", (req, res) => {
    item.find()
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));
});


//get item by id
router.get("/:id", (req, res) => {
    item.findById(req.params.id)
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));
}
);

router.get("/alluser", (req, res) => 
{
    const { items } = req.body
    let data = [];
    let error = false;
    //const response = items.map(id => item.findById(id).populate("bidding").th)
    for(let i = 0; i < items.length; i++){
        data.concat(item.findById(items[i]).populate("bidding").then(data => {
           return data.bidding;
        })).catch(()=> 
        {
            error = true;
        });
        if (error)
        {
            res.status(400).json("Error: Incomplete information");
            break;
        }
    }
}
);

router.get("/populate", (req,res) => {
    item.find({}).sort({"biddingLenght": -1}).limit(5)
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json("Error: " + err));
         
});
//delete item by id
router.delete("/:id", (req, res) => {
    item.deleteOne({ _id: req.params.id })
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));
        // debemos eliminar las licitacions asociadas a este item
});


module.exports = router;