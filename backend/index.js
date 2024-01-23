const express = require('express');
const app = express();
const {User} = require('./user');

app.use(express.json());

require('./db')();

app.use('/api/auth', require('./routes/auth'));



app.listen(3000, () => {console.log('Server is running on port 3000')});