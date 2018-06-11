const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

//Register 
router.post('/register', (req, res, next)=>{
    
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        provider: req.body.provider
    });

    User.registerUser(newUser, (err, user)=>{
        if(err){
            res.json({success: false, msg:'failed to register user'});
        }else{
            res.json({success: true, msg:'user Registered'});
        }
    })
});


//Authenticate
router.post('/authenticate', (req, res, next)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user)=>{
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data: user}, config.secret,{
                    expiresIn: 604800 // 1 week 
                 });

                res.json({
                    success: true,
                    token: 'JWT ' +token,
                    user: {
                        id: User._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            }else{
                return res.json({success: false, msg: 'Wrong Password'});
            }
        });

    })
});

//Profile 
router.get('/profile', passport.authenticate('jwt', {session: false}) , (req, res, next)=>{
    res.json({user: req.user});
});

module.exports = router;