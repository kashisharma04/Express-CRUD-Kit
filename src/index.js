const express = require('express');
var bodyParser = require('body-parser');
require('dotenv').config();
const route = require('../src/services/route');
const { default : mongoose} = require('mongoose');

const app = express();
// app.use(middlewareOne)
   
   
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(MONGODB_CONNECT,
{ useNewUrlParser : true }
)
.then( ()=> console.log(" MongoDb is Connected"))
.catch( err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 4040, function() {
    console.log('Express app running on port ' + (process.env.PORT || 4040))
});
