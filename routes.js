"use strict";

const Qs = require('querystring');

function index(req, res) {
    req.on('end', function indexRespnder() {
        res.writeHead(200, {"Content-Type":"text/html"});
        res.end("<html><body>Need to implement SPA</body></html>");
    });
    req.resume();
}
module.exports.index = index;

function fetchdata(req, res) {
    var reqbody = "";
    req.on('data', function collectPostData(chunk) {
        reqbody += chunk;
    });
    req.on('end', function fetchdataPostHandler() {
        var dataarr = [];
        for (let i =0; i < 1000; ++i) {
            dataarr.push({x:i, y:(Math.random()*10)/1.7+1});
        }
        var query = Qs.parse(reqbody)
        console.log("POST data:", query);
        res.writeHead(200, {"Content-Type":"application/json"});
        var respstr = JSON.stringify(dataarr);
        console.log(respstr);
        res.end(respstr);
    });
}
module.exports.fetchdata = fetchdata;
