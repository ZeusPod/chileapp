const express = require("express");
const itemSchema = require("../models/item");
const router = express.Router();
const item = require("../models/item");

//create item
router.post("/add_item", (req, res) => {
    const item = itemSchema(req.body);
    item
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));
});

//get all items
router.get("/get_items", (req, res) => {
    item.find()
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));
});


//get item by id
router.get("/get_item/:id", (req, res) => {
    item.findById(req.params.id)
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));
}
);

//delete item by id
router.delete("/delete_item/:id", (req, res) => {
    item.findByIdAndDelete(req.params.id)
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));
});


module.exports = router;