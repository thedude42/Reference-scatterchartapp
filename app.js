"use strict";

const Express = require('express');
const Path = require('path');
const Routes = require(Path.resolve(__dirname, 'routes.js'));
const BasicAuth = require('basic-auth');

const PORT = parseInt(process.env["PORT"]) || 8000;

function auth(req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  };

  var user = BasicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'foo' && user.pass === 'bar') {
    return next();
  } else {
    return unauthorized(res);
  };
};

console.log("starting app");
const app = Express();
app.use( "/", [auth, Express.static(Path.resolve(__dirname,"public"))]);
app.use(Express.static(Path.resolve(__dirname,'bower_components/jquery/dist')));
app.use(Express.static(Path.resolve(__dirname,'bower_components/chart.js/dist/')));

app.post("/app/fetchData", Routes.fetchdata);
//app.get("/", Routes.index);

app.listen(PORT, ()=>{console.log("App running on port", PORT)});
