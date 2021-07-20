var express = require("express");
var bodyParser = require("body-parser");
var app = express();

const mqttHandler = require('./mqtt/mqttHandler.js');
const apiConf = require("./config/api.config.js");
const tiqConf = require("./config/tiq.config.js");
const rpc = require("./rpc/rpc.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//--Conecta al broker
mqttHandler.connect();

// Rutas para envío de comandos RPC
app.post(apiConf.commandRoute, function(req, res) {
  rpc.toRpc(req,res);
});


//--Inicio del servicio Telemetry Input Queue TIQ
var server = app.listen(tiqConf.port, function () {
    console.log("Servicio Core corriendo en puerto.", server.address().port);
});