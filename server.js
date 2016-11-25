var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto = require('crypto');
var bodyParser=require('body-parser');

var config ={
    user:'sreekarsai08',
    database:'sreekarsai08',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
     return ["pbkdf","10000",salt,hashed.toString('hex')].join('$');
}

app.get('/hash/:input',function (req, res) {
  var hashedString=hash(req.params.input,'this-is-choko');
  res.send(hashedString);
});

app.post('/create-user',function(req,res) {
    var username=req.body.username;
    var password=req.body.password;
    
    var salt =crypto.getRandomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    
    pool.query('INSERT INTO "user" (username,password) VALUES($1,$2)',[username,dbString],function(err,result) {
        if(err){
           res.status(500).send(err.toString());
        }else{
           res.send('user successfully created' +username);
         } 
    });
});

app.post('/login',function(req,res) {
    var username=req.body.username;
    var password=req.body.password;
    
    pool.query('SELECT * FROM "user" username $1',[username],function(err,result) {
        if(err){
           res.status(500).send(err.toString());
        }else{
            if(result.rows.length===0){
                res.send(403).send('username/password is invalid');
            }else{
                var dbString=result.rows[0].password;
                var salt=dbString.split('$')[2];
                var hashedPassword=hashed(password,salt);
                if(hashedPassword===dbString){
                     res.send('credentials are correct'); 
                }else{
                    res.send(403).send('username/password is invalid');
                }
               
            }
         } 
    });
});


var pool = new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
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
app.get('/reg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'reg.html'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});