const express = require("express");
const userSchema = require("../models/user");
const router = express.Router();
const user = require("../models/user");

// create a new user
router.post("/singup", (req, res) => {
    const user = userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));
});	

// login a user
router.post("/singin", (req, res) => {
    const { email, password } = req.body;
    user.findOne({ email }, (err, user) => {
        if(err){
            res.status(500).send("Error de autenticación");
        }else if(!user){
            res.status(404).send("Usuario no encontrado");
        }else{
            user.isCorrectPassword(password, (err, same) => {
                if(err){
                    res.status(500).send("Error de autenticación");
                }else if(same){
                    res.status(200).send("Autenticación exitosa");
                }else{
                    res.status(404).send("Usuario y/o Contraseña incorrecta");
                }
        });
        }
    });
});


module.exports = router;