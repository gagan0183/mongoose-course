/**
 * Created by Gagan on 07-01-2017.
 */
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Book = require('./schema');
var db = "mongodb://localhost/test";

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

app.get('/', function (req, res) {
    res.send('hello');
});

app.get('/books', function (req, res) {
    console.log('in get');
    Book.find({})
        .exec(function(err, books){
        if(err) {
           res.send('err');
        }
        else {
            res.json(books);
        }
    });
});

app.get('/books/:i', function (req, res) {
   console.log('in get');
    Book.findOne({
        _id: req.params.i
    })
        .exec(function (err, book) {
           if(err){
               res.send('err');
           }
            else {
               res.json(book);
           }
        });
});

app.post('/books', function (req, res) {
   var newBook = new Book();

    newBook.title = req.body.title;
    newBook.author = req.body.author;
    newBook.category = req.body.category;

    newBook.save(function (err, book) {
       if(err) {
           res.send('err');
       }
        else {
           res.json(book);
       }
    });
});

app.put('/books/:i', function (req, res) {
   Book.findOneAndUpdate({
        _id: req.params.i
       },
       {
            $set: {
                title: req.body.title
            }
       },
       {
           upsert: true
       },
       function (err, newBook) {
            if(err) {
                res.send(err);
            }
            else {
                res.send(newBook);
            }
       });
});

app.delete('/books/:i', function (req, res) {
   Book.findOneAndRemove({
           "_id": req.params.i
       },
        function (err, book) {
            if(err){
                res.send('err')
            }
            else {
                res.send(204)
            }
        });
});

app.listen(9000, function () {
    console.log('server has start');
});