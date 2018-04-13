const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database'); 

//connect to database
mongoose.connect(config.database);

//on connections 
mongoose.connection.on('connected', ()=>{
    console.log('connected to database ' + config.database);
});

mongoose.connection.on('error', (err)=>{
    console.log('database error' + err);
});

const app = express();


const users = require('./routes/users');

// port Number
const port = 3000; //process.env.PORT || 8080;

app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// routing 
app.use('/users', users);

// Index Route
app.get('/', (req, res)=>{
    res.send('Invalid Endpoint');
});

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname), 'public/index.html')
})

app.listen(port, ()=>{
    console.log('server started on port '+ port);
});