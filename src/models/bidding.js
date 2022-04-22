//modelo de las licitaciones

const mongo = require('mongoose');

const biddingSchema = new mongo.Schema({
    code:{
        type: String,
    },
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
    },

    amount_available: {
        type: Number,
        required: true
    },

    publication_date: {
        type: Date,
        required: true
    },
    expiration_date: {
        type: Date,
        required: true
    },
    name_of_bidder: {
        type: String,
        required: true
    },
    num_purchases_made:{
        type: Number,
    },
    payments_claims:{
        type: Number,
    },

    //relaciones con otros modelos
    items: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'Items'
    }],
    user: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'User'
    }]

});


module.exports = mongo.model("Bidding", biddingSchema);