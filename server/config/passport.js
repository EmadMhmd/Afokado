const jwtStartegy = require('passport-jwt').Strategy;
const extractJwt =require('passport-jwt').ExtractJwt;

const User = require('../models/user.model.js');

module.exports = function(passport){
    let config ={};
    config.secretOrKey    =process.env.JWT_SECRET;
    config.jwtFromRequest =extractJwt.fromAuthHeaderAsBearerToken();

    passport.use(new jwtStartegy(config , async (jwtPayload , done )=>{

        try {
            const user =await User.findById(jwtPayload._id);
            if(user){
                return done(null ,user);
            }else{
                return done(null , false);
            }
        }catch(e){
            done(err , false)
        }

    }));
};
