const express = require('express');
const router = express.Router();
const database = require('../config/database');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const AuthenticateService = require('../backendService/authenticate');

router.post('/register', (req, res, next) => {
    let newAdmin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        setting : req.body.setting
    });

    AuthenticateService.registerCandidate(newAdmin, (err, admin)=>{
        if(err){
            res.json({success: false, msg: err})
        } else {
            res.json({success: true, msg: 'admin registered'})
        }
    });
});

router.patch('/setting/:_id', (req, res, next)=> {
    var id = req.params._id;
    var adminSetting = req.body.setting;

    Admin.updateSetting(id, adminSetting, {}, (err, adminSetting) => {
        if(err){
            throw err;
        }
        res.json(adminSetting);
    });
});

router.post('/authenticate', (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;

    Admin.getCandidateByEmail(email , (err, user)=>{
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'email not found'});
        }

        Admin.comparePassword(password, user.password, (err, isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data: email}, database.secret, {
                    expiresIn : 604800 // 1 week 
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id : Admin._id,
                        email : user.email
                    }
                });
            } else {
                return res.json({ success : false, msg: 'wrong password'})
            }
        });
        
    });
});

router.get('/getDetail/:_id', (req, res) => {
    Admin.getAdminById(req.params._id, (err, admin) =>{
        if(err){
            throw err;
        }
        res.json(admin);
    })
});

module.exports = router;