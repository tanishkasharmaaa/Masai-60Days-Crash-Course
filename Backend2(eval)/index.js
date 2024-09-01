const express=require("express");
const cors=require("cors");
const app=express();
const dotenv=require("dotenv");
const connection = require("./configs/db");
const UserRouter = require("./routes/user.route");
const stockRouter = require("./routes/stocksRoute");
dotenv.config();
const Port=process.env.PORT
const {rateLimit}=require("express-rate-limit")



const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

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



