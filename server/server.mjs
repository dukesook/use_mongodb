import path from 'path';
import express from 'express'; // $ npm install express
import mongoose from 'mongoose'; // $ npm install mongoose
import Person from './person.mjs';

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true}).catch(error => console.log("Something went wrong: " + error));

// Content-Type: application/x-www-form-urlencoded (used by HTML <form> submissions)
app.use(express.urlencoded());

// Content-Type: application/json
app.use(express.urlencoded()); // middleware for express to parse incoming requests with url-encoded payloads


// Serve static files from "public" folder (all .html, .css, & .js files)
app.use(express.static(path.join(process.cwd(), '../public')));

// Add a route for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), '../public/index.html'));
});

app.use(express.urlencoded({ extended: true }));

app.post('/upload', (req, res) => {
  console.log('Form submitted');
  // log request:
  console.log(req.body);
  // get name, date, and age from req.body:
  const { name, date, city, age } = req.body;
  res.send('Form received');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});