const mqttHandler = require('../mqtt/mqttHandler.js');
const mqttConf = require('../config/mqtt.config.js');
const apiConf = require('../config/api.config.js');
const out = require('../tim/tim.js');

exports.toRpc = (req,res) => {
    //--Send message to broker
    mqttHandler.sendMessage(mqttConf.commandTopic,req.body.message);
    //--Response to UI
    res.status(200).send("Mensaje enviado al broker: "+req.body.message);
    console.log("Command to broker");
    console.log('Topic:',mqttConf.commandTopic);
    console.log("Mesage",req.body.message);

    //--Send action to API for persistence
    actionParsed=JSON.parse(req.body.message);
    const actionData={
        "dispositivo":actionParsed.Device,
        "usuario":actionParsed.usuario,
        "comando":actionParsed.Command,//Actuacion.Canal
        "parametro":actionParsed.Parameter,//Actuacion.Accion
        "ts":new Date().getTime(),
        "token":req.headers.authorization
    }

    out.toApi(mqttConf.commandTopic, actionData);
};