var express = require("express");
var bodyParser = require("body-parser");
var app = express();

const mqttHandler = require('./mqtt/mqttHandler.js');
const apiConf = require("./config/api.config.js");
const tiqConf = require("./config/tim.config.js");
const rpc = require("./rpc/rpc.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//--Connect to broker
mqttHandler.connect();

//--Receive commands route from UI (http) and send to RPC (mqtt)
app.post(apiConf.commandRoute, function(req, res) {
  rpc.RpcComm(req,res);
});

//--Receive attributes route from UI (http) and send to RPC (mqtt)
app.post(apiConf.attributeRoute, function(req, res) {
  rpc.RpcAtt(req,res);
});

//--Start Core service
var server = app.listen(tiqConf.port, function () {
    console.log("Core service running on port:", server.address().port);
});