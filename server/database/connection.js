const mongoose=require('mongoose')

const connectDB = async()=>{
    try {
        const con = await mongoose.connect('mongodb://localhost:27017/users',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true,
            useFindAndModify:false
        })
        console.log(`MongoDB connected ${con.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB