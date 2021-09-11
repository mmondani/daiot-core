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

// Ruta de recepción (http) y envío de comandos RPC (mqtt)
app.post(apiConf.commandRoute, function(req, res) {
  rpc.RpcComm(req,res);
});

// Ruta de recepción (http) y envío de atributos RPC (mqtt)
app.post(apiConf.attributeRoute, function(req, res) {
  rpc.RpcAtt(req,res);
})

//--Inicio del servicio core
var server = app.listen(tiqConf.port, function () {
    console.log("Servicio Core corriendo en puerto.", server.address().port);
});