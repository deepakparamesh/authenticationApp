const express = require('express');
const router = express.Router();
const config = require('../config/database');



router.get('/userProfile', (req, res, next)=>{

    res.json({user : 'hi how are you'});
    
})