const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const schema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    address:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
// generate token
schema.methods.generateAuthTokens = async function(){
    try{
        const token = await jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token})
        await this.save()
        return token
    }catch(error){
        res.send("The error is "+error)
    }
}

//hash the password
schema.pre('save', async function(next){
    try{
        //const salt = await bcrypt.genSalt(10)
        // if(this.isModified("password")){
        //     this.password = await bcrypt.hash(this.password, 10)
        // }

        if(this.isModified("password")){
            const salt = await bcrypt.genSalt(10)
            this.password = await bcrypt.hash(this.password, salt)
        }

         next()
    }catch(error){
        next(error)
    }
})

const Userdb = mongoose.model('userdb',schema)

module.exports = Userdb 