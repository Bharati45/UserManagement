const express = require('express')
const route = express.Router()

const services = require('../services/render')
const controller = require('../controller/controller')
const auth = require('../middleware/auth')

/**
 * @description Root Route
 * @method GET/
 */
route.get('/', services.homeroutes)

/**
 * @description add users 
 * @method GET/
 */
route.get('/add_user', services.add_user)

/**
 * @description update user
 * @method GET/
 */
route.get('/update_user', services.update_user)

/**
 * @description login user
 * @method GET/
 */
route.get('/login', services.login_user)

/**
 * @description secret user
 * @method GET/
 */

route.get('/secret',auth ,services.secret_user)

/**
 * @description logout user
 * @method GET/
 */
route.get('/logout', auth, services.logout_user)

route.get('/page', (req,res) => {
    res.render('page')
})

//API
route.post('/api/users',controller.create)
route.get('/api/users',controller.find)
route.put('/api/users/:id',controller.update)
route.post('/api/user/login',controller.login)

module.exports = route