//modelo rubros de las busquedas de usuarios
const mongo = require('mongoose');

const itemsSchema = new mongo.Schema({
    name: {
        type: String,
        required: true
    },

    //relaciones con otros modelos
    user: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'User'
    }],
    
    // relacionamos los biddings
    bidding: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'Bidding'
    }]
});


module.exports = mongo.model("Item", itemsSchema);