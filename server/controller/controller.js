const Userdb = require('../model/model');
const bcrypt = require('bcrypt');

//create and save new user
exports.create = async (req,res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        
        //Validate the user
        if(!req.body){
            res.status(400).send({message:"Content can not empty!"});
            return;
        }
    
        if(password===cpassword){
            const user = new Userdb({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                mobile:req.body.mobile,
                address:req.body.address,
                password:password,
            })

            // call token method
            const token = await user.generateAuthTokens()

            // res.cookie() function is used to set the cookie name to value
            //The value parameter may be string or object converted to JSON
            res.cookie("jwt", token,{
                expires:new Date(Date.now() + 50000),
                httpOnly:true
            })

            const addUser = await user.save()
            res.status(201).render('add_user')

        }
        else{
            res.send(`Password is not matching!`)
        }
    } catch (error) {
        res.status(400).send(error)
    }
   
}

//retrieve and return all users/retrieve and return single user
exports.find = (req,res) => {
    if(req.query.id){
        const id=req.query.id;
        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"User not found with id"+id})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error retriving user with id "+id})
        })
    }else{
        Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(error=>{
            res.status(500).send({message:error.message||"Error occured while retriving user"})
        })
    }
}

//update a new identified user by id
exports.update = (req,res) => {
    
    const id = req.params.id;
    //console.log(req)
    Userdb.findByIdAndUpdate(id,req.body)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Can not update user with ${id}.May be user not found`})
        }else{
            res.send(data)
        }       
    })
    .catch(error=>{
        res.status(500).send({message:error.message||"Error update user information"})
    })
}

//login the authenticated user

exports.login = async(req,res) => {
    try {
        const email=req.body.email;
        const password=req.body.password;

        const useremail = await Userdb.findOne({email:email});
        const isMatch = await bcrypt.compare(password, useremail.password)

        const loginToken = await useremail.generateAuthTokens()
        
        res.cookie("jwt", loginToken,{
            expires:new Date(Date.now()+600000),
            httpOnly:true
        })
        
        if(isMatch){
            res.status(201).render('secret')
        }else{
            res.send("Invalid login details!")
        }
    } catch (error) {
        res.send("Invalid login details!");
    }   
}