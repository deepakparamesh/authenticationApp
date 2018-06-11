const express = require('express');
const router = express.Router();
const passport = require('passport');
const database = require('../config/database');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Authenticate = require('../backendService/authenticate');


router.post('/register', (req, res, next) => {
    let newUser = new User({
        email: req.body.email,
        password: req.body.password 
    });

    User.addUser(newUser, (err, user)=>{
        if(err){
            res.json({success: false, msg: err });
        }else {
            res.json({success: true, msg:'user Registered'})
        }
    });

});


router.post('/authenticate', (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, email)=>{
        if(err) throw err;
        if(!email){
            return res.json({success: false, msg: 'Email not found'});
        }

        User.comparePassword(password, email.password, (err, isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data: email}, database.secret, {
                    expiresIn : 604800 // 1 Week 
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: User._id,
                        email: email.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'wrong Password'});
            }
        });
    })
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', (req, res)=>{
    res.send('you reached the redirect URI');
})

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next)=>{
    res.json({user: req.user});
});

module.exports = router;