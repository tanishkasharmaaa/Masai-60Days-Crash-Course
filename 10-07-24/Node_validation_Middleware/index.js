
const fs = require("fs");// Import the fs module for file system operations
const express = require("express"); // Import the express module
const server = express();// Create an instance of express
const port = 8080;// Define the port number

server.use(express.json());// Middleware to parse JSON bodies
// Middleware to validate the request data format
const middleware = (req, res, next) => {
  let reqData =req.body;

   // Check if the data types of the properties match the required format
  if (
    typeof reqData.ID === "number" &&
    typeof reqData.Name === "string" &&
    typeof reqData.Rating === "number" &&
    typeof reqData.Description === "string" &&
    typeof reqData.Genre === "string" &&
   Array.isArray(reqData.Cast) &&
    reqData.Cast.every((item) => typeof item === "string")
  ) {
     next();// If data is valid, pass control to the next middleware or route handler
   
    
   
  }
  else{
    fs.appendFileSync("./res.txt",`Validation failed for data: ${JSON.stringify(reqData)}\n`,"utf-8")
    res.status(400).send('bad request. some data is incorrect.')
  }
  
  
};

// POST route to add a new todo
server.post("/", middleware, (req, res) => {
     // Read the existing data from db.json
let readData = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

let length=readData.data.length;// taking the length of readData.data

  let data = {
    ID: length+1,
    Name: req.body.Name,
    Rating: req.body.Rating,
    Description: req.body.Description,
    Genre: req.body.Genre,
    Cast: req.body.Cast,
  };

    // Add the new data to the existing data
  readData.data.push(data);
 // Write the updated data back to db.json
  fs.writeFileSync("./db.json", JSON.stringify(readData), "utf-8");
// Write the data to res.txt
  fs.writeFileSync("./res.txt",`Validation check has passed by this data :---- ${JSON.stringify(readData)}`, "utf-8");
  // Send a response indicating successful data submission
  res.status(200).send("Data sent successfully");
  
});
// Start the server and listen on the defined port
server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
