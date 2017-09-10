var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: "someRandomStringHere",
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));


//Resources
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


//Database
var config = {
    user: 'scienceganesh007',
    database: 'scienceganesh007',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var pool = new Pool(config);
app.get('/test-db', function (req, res){
    pool.query('SELECT * FROM test', function (err, result) {
        if(err)
        {
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result.rows));
        }
    });
});


//Articles
function createTemplate(data) {
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
    var htmlTemplate = `
    <html>
        <head>
            <title>${title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3>${heading}</h3>
                <div>
                    ${date.toDateString()}
                </div>
                <div>
                   ${content}
                </div>
            </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}
app.get('/articles/:articleName',function (req, res){
    
    pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function(err, result) {
        if(err) {
            res.status(500).send(err.toString());
        } else if(result.rows.length === 0) {
            res.status(404).send('404: Article not found');
        } else {
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
    });
});


//Password
function hash(input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pdkdf2", "10000", salt, hashed.toString('hex')].join('$');
}
app.get("/hash/:input", function(req, res) {
    var hashedString = hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
});


//Users
app.post('/create-user', function(req, res) {
    //Details
    var username = req.body.username;
    var password = req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES ($1, $2)', [username, dbString], function(err, result){
        if(err)
        {
            res.status(500).send(err.toString());
        } else {
            res.send("User successfully created: " + username);
        }
    });
});
app.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    pool.query('SELECT * FROM "user" WHERE username = $1', [username], function(err, result){
        if(err)
        {
            res.status(500).send(err.toString());
        } else {
            if(result.rows.length===0) {
                res.status(403).send('username/password invalid');
            }
            else {
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[2];
                var hashedPassword = hash(password, salt); //hash based on password submitted and original salt
                if(hashedPassword === dbString) {
                    
                    //Set the session
                    req.session.auth = { userId: result.rows[0].id, userName: result.rows[0].username };
                    //set cookie with a session id(random string)
                    //internally, on the server side, it maps the session id to an object
                    //This object has the { auth: { userId } };
                    
                    res.send(JSON.stringify(result.rows[0].username));   
                }
                else {
                    res.status(403).send('username/password invalid');   
                }
            }
        }
    });
});
app.get('/logout', function(req,res) {
   delete req.session.auth;
   res.send('You are logged out');
});
app.get('/check-login', function(req,res){
   if(req.session && req.session.auth && req.session.auth.userId) {
       res.status(200).send(req.session.auth.userName.toString());
   }
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});