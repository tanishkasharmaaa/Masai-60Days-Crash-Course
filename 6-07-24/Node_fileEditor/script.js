const express=require('express');
const fs=require('fs');
const { send } = require('process');


const server=express();
let port=4000;
// Middleware to parse JSON bodies
server.use(express.json());
// Route to get data
server.get('/getData',(req,res)=>{
  let data=fs.readFileSync('./db.json',"utf-8");
  res.send(data)
 
})
// Route to post data
server.post('/postData',(req,res)=>{
  let data=fs.readFileSync('./db.json',"utf-8");
  let parsedData=JSON.parse(data);
  let parsedTodo=parsedData.todos;
  let object={
    id:parsedTodo.length+1,
    title:req.body.title,
    status:false
  }
    // Add the new todo object to the list
  parsedTodo.push(object);
parsedData.todos=parsedTodo;
fs.writeFileSync('./db.json',JSON.stringify(parsedData,null,2),'utf-8');
res.send('Data has added successfully');
})
// Route to update data using PUT
server.put('/putData/:id', (req, res) => {
  let data = fs.readFileSync('./db.json', 'utf-8');
  let parsedData = JSON.parse(data);
  let todos = parsedData.todos;

  let id = parseInt(req.params.id, 10);
  let { title } = req.body;

  let found = false;

    // Update the todo item if the ID is even
  todos = todos.map((ele) => {
      if (ele.id === id && id % 2 === 0) {
          ele.title = ele.title;// This line doesn't change the title
          ele.status = true;
          found = true;
      }
      return ele;
  });

  if (found) {
      parsedData.todos = todos;
      fs.writeFileSync('./db.json', JSON.stringify(parsedData, null, 2), 'utf-8');
      res.json({ message: 'Item updated successfully' });
  } else {
      res.status(404).json({ message: 'Item not found or ID is not even' });
  }
});

// Route to delete data

server.delete('/delete/:id', (req, res) => {
  let data = fs.readFileSync('./db.json', "utf-8");
  let parsedData = JSON.parse(data);
  let todos = parsedData.todos;

// Parse the ID from the request parameters
  let id = parseInt(req.params.id, 10);

 // Filter out the item with the matching ID
  let filteredTodos = todos.filter((ele) => ele.id !== id);

   // Update the parsed data with the filtered todos
  parsedData.todos = filteredTodos;

  // Write the updated data back to the file
  fs.writeFileSync('./db.json', JSON.stringify(parsedData, null, 2), "utf-8");

  res.send('Item deleted successfully');
});
// Route to patch data
server.patch('/patchData/:id',(req,res)=>{
let data=fs.readFileSync('./db.json','utf-8');
let parsedData=JSON.parse(data);

let todos=parsedData.todos;
let {title,status}=req.body
let id=parseInt(req.params.id,10);
let found=false;
 // Update the todo item with the provided title and/or status
todos=todos.map((ele)=>{
  if(ele.id===id){
  
    if(title!==undefined){
      ele.title=title;
    }
if(status!==undefined){
ele.status=status
}
found=true
  }
  return ele
})

if(found){
parsedData.todos=todos;
fs.writeFileSync('./db.json',JSON.stringify(parsedData,null,2),'utf-8');
res.json({message:'Item updated successfully'})
}
else{
  res.status(404).json({ message: 'Item not found or ID is not even' });
}
})

// Start the server
server.listen(port,()=>{
  console.log(`Server is running at port ${port}`)
})