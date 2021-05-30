const axios = require('axios');

exports.homeroutes = (req,res) => {
    axios.get('http://localhost:3000/api/users')
    .then(function(response){
        res.render('index',{users:response.data});
    })
    .catch(err=>{
        res.send(err);
    }) 
}

exports.add_user = (req,res) => {
    res.render('add_user')
}

exports.update_user = (req,res) => {
    
    axios.get('http://localhost:3000/api/users',{params:{id:req.query.id}})
    .then(function(userdata){
        res.render('update_user',{user:userdata.data})
       //console.log(userdata)
    })
    .catch(err=>{
        res.send(err)
    })
    
}

exports.login_user = (req,res) => {
    res.render('login');
}

exports.secret_user = (req,res) => {
    res.render('secret');
}

exports.logout_user = async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((currentelement) => {
            return currentelement.token!==req.token;
        })
        res.clearCookie("jwt");
        
        await req.user.save();
        res.render("login")
    } catch (error) {
        res.status(500).send(error);
    }
}
