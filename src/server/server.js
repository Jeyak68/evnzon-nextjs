const express = require('express');
const cors = require('cors');

const app = express();

// Configure CORS to allow requests from localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

// Your other routes and server configuration here

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

