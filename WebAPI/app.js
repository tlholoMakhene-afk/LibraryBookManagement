const express = require('express');
const app = express();
const morgan = require('morgan');//Logging middle ware
const bodyParser = require('body-parser');
const mongoose = require('mongoose');//not using the official mongoclient

const bookRoutes = require('./routes/book');


mongoose.connect('mongodb+srv://dbUser:dbUserPassword@mynodedata.zcfxf.mongodb.net/dbLibraryManagment?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true,})
mongoose.Promise = global.Promise;
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Appending headers to any response we send back
app.use((req, res, next) => {
    //This will not send the response 
    //But Adjusts the response to have these headers
    res.header('Access-Control-Allow-Origin', '*');
    //could add a restriction to whom(client) can access it
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    //which headers my be sent along with the req can be *
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
})

//Routes which handle/forward request for our resources
app.use('/books', bookRoutes);


//if an error  makes it past here 
//it means none of the routes where able to process it
//so we can do error handling here
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);//forwards to the next with the error
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error:
        {
            message: error.message,
        }
    });

});

module.exports = app;