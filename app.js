const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const cors = require('cors');
const passport = require('passport');

const app =  express();
const PORT = 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// declaring routes path
const users = require('./routes/users');
const admins = require('./routes/admins');


require('./config/passport')(passport);

//using routes
app.use('/users', users);
app.use('/admins', admins);

app.get('/', (req, res)=>{
    res.send('Try going to localhost:3000/home');
});

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname), 'public/index.html');
});

//connection to the server
app.listen(PORT, ()=>{
    console.log( `PAL started in the port ${PORT}` );
});

//connection to mongoDB 
mongoose.connect(config.database);

mongoose.connection.on('connected', ()=>{
    console.log('connected to database' + config.database);
});

mongoose.connection.on('error', (error)=>{
    console.log(`error in connection with mongodb ${error}` );
})