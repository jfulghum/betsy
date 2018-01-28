let express = require('express');
let app = express();
let morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
let models = require('./models');
var nunjucks = require('nunjucks');

module.exports = app 

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
var env = nunjucks.configure('views', { noCache: true });

app.use(express.static(path.join(__dirname, './public'))); //serving up static files (e.g. css files)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/products', require('./routes/products'));
app.use('/users', require('./routes/users'));

app.get('/', function (req, res) {
   res.render('index');
});


models.Product.sync({force: true}) 
.then(() => models.User.sync({force: true}))
.then(function () {
    app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);
