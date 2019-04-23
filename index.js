const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const PORT = process.env.PORT || 5000;

const app = express();

// Init middleware
//app.use(logger);




// app.get('/', (req,res) => {res.sendFile(path.join(__dirname,'public','index.html'));});

// Create static folder
app.use(express.static(path.join(__dirname,'public')));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Members API
app.use('/api/members', require('./routes/api/members'));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));