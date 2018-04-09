import { mongo } from 'mongoose';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const ProfileSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    Gender: {
        type: String,
        required: true
    }
});

const Profile = module.exports = mongoose.model('Profile', ProfileSchema);

module.exports.addProfileData = function( profileData, callback){
    
}