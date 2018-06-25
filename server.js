const port = process.env.PORT||3000 ;
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

require('./api/routes')(app);

app.listen(port, ()=>{
    console.log("We are live on " + port);
})