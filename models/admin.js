const database = require('../config/database');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Authenticate = require('../backendService/authenticate');


const adminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    setting : {
        type: String, 
        required: false
    }
});

const Admin = module.exports = mongoose.model('Admin', adminSchema);

module.exports.getCandidateByEmail = function(email, callback){
    const query = {email : email}
    Admin.findOne(query, callback)
}

module.exports.comparePassword = function( enteredPassword, hash, callback){
    bcrypt.compare(enteredPassword , hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    })
}

module.exports.updateSetting = function(id, adminSetting, options ,callback){
    var query = { _id : id};
    var update = {
        setting : adminSetting
    }
    Admin.findOneAndUpdate(query, update, options, callback);
}

module.exports.getAdminById = (id, callback) => {
    Admin.findById(id, callback);
}