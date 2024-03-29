const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const Schema = mongoose.Schema;


const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  studentID: { type: Number , required: true },
});


// Create a Model object
const student = mongoose.model("w24students", userSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  const connectionString = req.body.myuri
  
  // connect to the database and log the connection
  const result =connectDb(connectionString)
  console.log(result)
  // add the data to the database

  // send a response to the user
  res.send(`<h1>Document  Added</h1>`);

});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

function connectDb(connectionAddress){
  mongoose
  .connect(connectionAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
    const name = "Dogukan Kahraman"
    const studentID = 300365480
    const newStudent = new student({
      name,
      studentID,
    })
    newStudent.save().then(() => {
      console.log("user added")
      
    })

  })
  .catch((err) => {
    
    console.log("Error connecting to the database", err);
  });
  return true

}
