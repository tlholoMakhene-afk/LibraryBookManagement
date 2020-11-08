// load the things we need
var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var viewMnger = require('./ViewerManager');

var app = express();

// set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

// index page
app.get('/', function(req, res) {
    
    viewMnger.getBooksData().then((response) => {
        // use res.render to load up an ejs view file
        res.render('pages/index', {Books: response.books, Length: response.count});
    });
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

let categories = ['Fantasy','Adventure','Romance','Contemporary','Mystery','Horror','Paranormal','Historical Fiction','Science Fiction','Memoir','Cooking','Motivational','Health','Humor'];
//insert form page
app.get('/New', function(req, res) {
    res.render('pages/form', {action:"Insert", categories: categories});
});

//update form page
app.get('/patch/:bookId', function(req, res) {
    viewMnger.getSpecifiedBook(req.params.bookId).then((response)=>
{ res.render('pages/form', {action:"Update", categories: categories, object: response.book}); })
   
});


// delete book
app.get('/delete/:bookId', function(req, res) {
    let bookID = req.params.bookId;
    viewMnger.DeleteBook(bookID).then((response)=>{
        console.log(response);
         //redirect to main page, sort of refresh 
        res.redirect('/');
    }).catch((err)=>{console.log(err);});
});



//insert new book
app.post('/Insert', function(req, res)
{
   let paramsObj = req.body; 
   viewMnger.InsertNewBook(paramsObj).then((response)=>{
       console.log(response);
       //redirect to main page, sort of refresh
       res.redirect('/');
    }).catch((err)=>{console.log(err);})  
    
})

// post book
app.post('/Update/:bookId', function(req, res) {
    let bookID = req.params.bookId;
    viewMnger.UpdateBook(bookID, req.body).then((response)=>{
        console.log(response);
         //redirect to main page, sort of refresh 
        res.redirect('/');
    }).catch((err)=>{console.log(err);});
});

module.exports = app;