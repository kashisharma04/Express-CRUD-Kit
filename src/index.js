const express = require('express');
var bodyParser = require('body-parser');

const route = require('../src/services/route');
const { default : mongoose} = require('mongoose');

const app = express();
// app.use(middlewareOne)
   
   

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb+srv://kashisharma:1U3EnCZfQuitxgNI@cluster0.s9hkgej.mongodb.net/Kashi_JaiKishan_bonous?retryWrites=true&w=majority',
{ useNewUrlParser : true }
)
.then( ()=> console.log(" MongoDb is Connected"))
.catch( err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 4040, function() {
    console.log('Express app running on port ' + (process.env.PORT || 4040))
});
