const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');

module.exports.registerCandidate = function(newCandidate, callback){
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newCandidate.password, salt, (err, hash)=>{
            if(err) throw err;
            newCandidate.password = hash;
            newCandidate.save(callback);
        });
    });
}

