var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

/*
var articles = {
    'article-one': {
        title:'Article 1 | Grk',
        heading:'Article 1',
        date:'Aug 5, 2017',
        content:`
        <p>
            This is the content of the first article. This is the content of the first article. This is the content of the first article. This is the content of the first article.
        </p>
        <p>
            This is the content of the first article. This is the content of the first article. This is the content of the first article. This is the content of the first article.
        </p>
         <p>
            This is the content of the first article. This is the content of the first article. This is the content of the first article. This is the content of the first article.
        </p>`
    },
    'article-two': {
        title:'Article 2 | Grk',
        heading:'Article 2',
        date:'Aug 10, 2017',
        content:`
        <p>
            No. 2
        </p>
        <p>
            Yeah, Article 2
        </p>
         <p>
            There's one more ;)
        </p>`
    },
    'article-three': {
        title:'Article 3 | Grk',
        heading:'Article 3',
        date:'Aug 20, 2017',
        content:`
        <p>
            This is 3
        </p>
        <p>
            Call me Article 3
        </p>
         <p>
            Did you check Article 1?
        </p>`
    }
};

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
                    ${date}
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

app.get('/:articleName',function (req, res){
    var articleName = req.params.articleName;
   res.send(createTemplate(articles[articleName])); 
});
*/

var counter=0;
app.get('/counter', function(req, res) {
   counter = counter + 1;
   res.send(counter.toString());
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


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
