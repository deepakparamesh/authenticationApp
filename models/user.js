const database = require('../config/database');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: false
    },
    profilePic: {
        type: String,
        required: false
    },
    provider : {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback){
    const query = { email: email}
    User.findOne(query, callback)
}

module.exports.registerUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err;
            newUser.password = hash ;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByEmail = function(email, callback){
    const query = {email : email}
    User.findOne(query, callback)
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}

