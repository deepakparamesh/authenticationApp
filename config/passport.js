const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');
const keys = require('./keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        User.getUserById(jwt_payload.data._id, (err, user)=>{
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));

    passport.use( new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, ()=>{
        // passport callback function
        })
    )
}