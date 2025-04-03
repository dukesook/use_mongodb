import express from 'express'; // $ npm install express
import mongoose from 'mongoose'; // $ npm install mongoose
// npm install ejs
import PersonModel from './models/person.mjs';

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/myDatabase', {useNewUrlParser: true}).catch(error => console.log("Something went wrong: " + error));

// WARNING: body-parser deprecated undefined extended: provide extended option
// Content-Type: application/x-www-form-urlencoded (used by HTML <form> submissions)
app.use(express.urlencoded());

// Content-Type: application/json
// WARNING: body-parser deprecated undefined extended: provide extended option
app.use(express.urlencoded()); // middleware for express to parse incoming requests with url-encoded payloads

app.use(express.static('public'));

// Use embedded JavaScript (EJS) as the template engine
app.set("view engine", "ejs");

// Add a route for the root URL
app.get('/', (req, res) => {
  res.render('index');
});

app.use(express.urlencoded({ extended: true }));

app.get('/upload', (req, res) => {
  res.render('upload');
})

app.post('/upload', (req, res) => {
  console.log('Form submitted');
  // log request:
  console.log(req.body);
  // get name, date, and age from req.body:
  const { name, date, city, age } = req.body;
  let newPerson = new PersonModel(req.body);
  newPerson.save().then(function(){
    res.render('response', req.body);
  }).catch(function(err){
    console.error("Failed to add new person to database:", err);
    res.status(500).send("Failed to add new person to database.");
  });
});

app.get('/list', (req, res) => {
  PersonModel.listAllPeople().then(function(people){
    console.log(people)
    res.render('list', {people:people});
}).catch(function(error){ 
  console.error("Failed to add new person to database:", err);
  res.status(500).send("Failed to add new person to database.");
});
})

app.get('/query', (req, res) => {
  res.render('query');
})

app.get('/run-query', async (req, res) => {
  console.log(req.query);

  const projection = { 
    _id: 0,
    __v: 0
  };

  const results = await PersonModel.find(req.query, projection);
  console.log(results);
  res.json(results);
  // const results = await PersonModel.find({ age: { $eq: age } });
  // const results = await PersonModel.find({ age: { $gte: 18 } });
})



// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});