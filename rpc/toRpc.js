const mqttHandler = require('../mqtt/mqttHandler.js');
const mqttConf = require('../config/mqtt.config.js');
const apiConf = require('../config/api.config.js');
const out = require('../tiq/toApi.js');

exports.toRpc = (req,res) => {
    mqttHandler.sendMessage(mqttConf.commandTopic,req.body.message);
    res.status(200).send("Mensaje enviado al broker: "+req.body.message);
    //--Poner acá la grabacion de la accion en la bd 
    //console.log('values:',req.body.values,'topic:',mqttConf.commandTopic);
    //--recabar los datos de envio a la api:
    actionParsed=JSON.parse(req.body.message);
    //console.log(req.body.message);
    //console.log(actionParsed.Device);
    ///console.log(actionParsed.Actuacion.Canal);
    //console.log(actionParsed.Actuacion.Accion);
    const actionData={
        "dispositivo":actionParsed.Device,
        "usuario":actionParsed.usuario,//"castello.marcelo@gmail.com",
        "canal":actionParsed.Actuacion.Canal,
        "estado":actionParsed.Actuacion.Accion,
        "ts":new Date().getTime(),
        "token":req.headers.authorization
    }
    out.toApi(mqttConf.commandTopic, actionData);
};