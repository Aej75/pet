const express = require('express');

const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');


require('dotenv/config');


app.use(bodyParser.json());


//IMPORT routes

const postRoute = require('./routes/posts');

const registerRoute = require('./routes/register')

app.use('/register', registerRoute);
app.use('/', postRoute);



//connection to DATabase

mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true }).then(() => { console.log('Connected to DB!!'); });

//Listen

app.listen(3000);