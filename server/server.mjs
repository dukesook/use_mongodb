import path from 'path';
import express from 'express'; // $ npm install express


const app = express();
const PORT = 3000;

// Serve static files from "public" folder (all .html, .css, & .js files)
app.use(express.static(path.join(process.cwd(), '../public')));

// Add a route for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), '../public/index.html'));
});

app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  console.log('Form submitted');
  // log request:
  console.log(req.body);
  res.send('Form received');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});