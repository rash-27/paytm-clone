const express = require('express');
const app = express();
const {User} = require('./user');
const cors = require('cors');
const config = require('config');
app.use(express.json());
app.use(cors());
require('./startup/config')();
require('./startup/db')();
require('./startup/routes')(app);





app.listen(3000, () => {console.log(`Server is running on port ${config.get('Port')}`)});