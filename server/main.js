const express = require('express');
const bodyParser = require('body-parser');

const APP_PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// serve up /dist directory as static assets
app.use(express.static('dist'));

function started() {
  console.log(`webapp running at: http://localhost:${APP_PORT}`);
}

app.listen(APP_PORT, started);