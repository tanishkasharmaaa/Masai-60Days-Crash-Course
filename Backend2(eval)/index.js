const express=require("express");
const cors=require("cors");
const app=express();
const dotenv=require("dotenv");
const connection = require("./configs/db");
const UserRouter = require("./routes/user.route");
const stockRouter = require("./routes/stocksRoute");
dotenv.config();
const Port=process.env.PORT

app.use(cors("*"))

app.use('/user',UserRouter)
app.use('/stock',stockRouter)

app.listen(Port,async()=>{
try {
    await connection
    console.log(`Server is running at port ${Port}`)
} catch (error) {
    console.log(error)
}
})



