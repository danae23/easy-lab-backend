const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//Express server
const app = express();

//Database
dbConnection();

//CORS
app.use(cors());

//JSON Parse
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));

const { PORT } = process.env;
app.listen(PORT, () => {
    console.log(`Servidor levantado ${PORT}`);
});