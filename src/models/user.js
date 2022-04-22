const mongo = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;


const userSchema = new mongo.Schema({
    names: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
    //relaciones con otros modelos
    item: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    bidding: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'Bidding'
    }]

});


userSchema.pre('save', function (next) {
    if(this.isNew || this.isModified('password')){
        const document = this;
        bcrypt.hash(document.password, saltRounds, function (err, hashedPassword) {
            if (err) {
                next(err);
            } else {
                document.password = hashedPassword;
                next();
            }
        });
    }else{
        next();
    }
});

userSchema.methods.isCorrectPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
};

module.exports = mongo.model("User", userSchema);