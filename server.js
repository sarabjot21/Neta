const port = 3000;
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));

require('./api/routes')(app);

app.listen(port, ()=>{
    console.log("We are live on " + port);
})