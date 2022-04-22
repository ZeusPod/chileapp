const express = require('express')
const biddingSchema = require('../models/bidding')
const router = express.Router()
const bidding = require('../models/bidding')


//create bidding
router.post('/add_bidding', (req, res) => {
    const bidding = biddingSchema(req.body);
    bidding
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));
});

// get all biddings
router.get('/get_biddings', (req, res) => {
    bidding.find()
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));
});

// get bidding by id
router.get('/get_bidding/:id', (req, res) => {
    bidding.findById(req.params.id)
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));
});

// delete bidding by id
router.delete('/delete_bidding/:id', (req, res) => {
    bidding.findByIdAndDelete(req.params.id)
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));
});

// update bidding by id
router.put('/update_bidding/:id', (req, res) => {
    bidding.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));
});


module.exports = router;