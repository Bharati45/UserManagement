const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')
const connectDB = require('./server/database/connection')
const controller = require('./server/controller/controller')
const cookieParser = require('cookie-parser')

const app = express()

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

//log request
//app.use(morgan('tiny'))

//mongoDB connection
connectDB();

//parse cookies to client
app.use(cookieParser())
// parse request to bodyparser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set("view engine", "ejs")

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//load routers
app.use('/',require('./server/routes/router'))

app.listen(PORT,()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
})