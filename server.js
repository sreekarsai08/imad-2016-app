var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('#', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/aboutschool', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'aboutschool.html'));
});
app.get('/ac', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'ac.html'));
});
app.get('/ad', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'ad.html'));
});
app.get('/faculty', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'faculty.html'));
});
app.get('/news', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'news.html'));
});
app.get('/schoollife', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'schoollife.html'));
});
app.get('/trans', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'trans.html'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});