var express = require('express'),
  home = require(__dirname+'/server/routes/home'),
  occasion = require(__dirname+'/server/api/occasion');
  
var app = express();

app.set('view engine', 'kiwi')
app.set('views', __dirname+'/server/views');
app.use(express.logger('dev'))
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); 
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
app.use(express.cookieParser('S3CRE7'));
app.use(express.session());
  
app.get('/',home.get);

app.post('/occasion', home.post);
app.get('/occasion', occasion.getAll);
app.get('/occasion/:id', occasion.getById);
app.delete('/occasion/:id', occasion.delete);

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
