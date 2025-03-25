let express = require('express');
let app = express();

require('dotenv').config();
const bodyParser = require('body-parser');

console.log("Hello World");

/*app.get("/", function(req, res) {
    res.send("Hello Express");
});*/

//bsolutePath = __dirname + '/views/index.html';

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.use("/public", express.static(__dirname + "/public"));

app.use('/', (req, res, next) => {
    let string = req.method + ' ' + req.path + ' - ' + req.ip;
    console.log(string);
    next();
});

app.get('/json', (req, res) => {
    let response = 'Hello json';

    if (process.env.MESSAGE_STYLE === 'uppercase'){
        response = response.toUpperCase();
    }

    res.json({
        message: response
    });
});

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({
        time: req.time
    });
});

/* OR declare the middleware beforehand to use in multiple routes as shown below:
const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

app.get("/now", middleware, (req, res) => {
  res.send({
    time: req.time
  });
});*/

app.get('/:word/echo', (req, res) => {
    const { word } = req.params;
    res.json({
        echo: word
    });
});

app.route('/name')
    .get((req, res) => {
        let { first: firstName, last: lastName } = req.query;

        res.json({
            name: `${firstName} ${lastName}`
        });
    })
    .post((req, res) => {
        let {first: firstName, last: lastName} = req.body;

        res.json({
            name: `${firstName} ${lastName}` 
        });
    });































 module.exports = app;
