const express = require('express');
const cors = require('cors');

const app = express();

// Allow requests from your Next.js app's domain
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your Next.js app's domain
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Define your API routes here

app.listen(8000, () => {
  console.log('API server is running on port 8000');
});
