const express=require('express');
const fs=require('fs')
const morgan=require('morgan')
const path=require('path');
const port =8080;
const app=express();

var accessLogStream=fs.createWriteStream(path.join(__dirname,'access.log'));
morgan.token('response-time',function(req,res){
    return `${Date.now() - req._startTime}ms`
})

var morganFormat=':method :status :res[content-length] - :response-time : data[iso] HTTP/:http-version :url';
app.use(morgan(morganFormat,{stream:accessLogStream}));

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).send('GET request to to the homepage')
})
app.get('/get-users',(req,res)=>{
    res.status(200).send('Get request of the users')
})
app.post('/add-user',(req,res)=>{
    res.status(201).send('User data sent successfully')
 
})
app.put('/user/:id',(req,res)=>{
    res.status(201).send(`User with id ${req.params.id} updated successfully`);
})
app.delete('/user/:id',(req,res)=>{
    res.status(201).send(`User with id ${req.params.id} deleted successfully`);
})
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})
