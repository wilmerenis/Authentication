var mongoose = require('mongoose');
var User = mongoose.model('User');
var service = require('./service');

exports.emailSignup = function(req, res) {
    var user = new User({
        email:String,
        password:String
    });

    user.save(function(err){
        if (!err){
          return res
          .status(200)
          .send({token: service.createToken(user)});
        }
        else console.log("ERROR: " + err);

    });
};

exports.emailLogin = function(req, res) {
    User.findOne({email: req.body.email.toLowerCase()}, function(err, user) {
        // Comprobar si hay errores
        // Si el usuario existe o no
        // Y si la contraseña es correcta
        return res
            .status(200)
            .send({token: service.createToken(user)});
    });
};
