const jwt = require('jsonwebtoken');
const Userdb = require('../model/model')

const auth = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = await jwt.verify(token,process.env.SECRET_KEY);
        const user = await Userdb.findOne({_id:verifyUser._id});
        
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send('Invalid login details')
    }
}

module.exports = auth;