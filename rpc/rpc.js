const axios = require('axios');
const mqttHandler = require('../mqtt/mqttHandler.js');
const mqttConf = require('../config/mqtt.config.js');
const apiConf = require('../config/api.config.js');
const configAxios = { 
    headers: {
      'Content-Type': 'application/json'
      } 
}

//--Commands from POST route /command
exports.RpcComm = (req,res) => {
    //--Send message to broker
    mqttHandler.sendMessage(mqttConf.commandTopic,req.body.message);

    //--Response to UI
    res.status(200).send("Mensaje de comando enviado al broker: "+req.body.message);

    //--log to console
    console.log("Command to broker");
    console.log('Topic:',mqttConf.commandTopic);
    console.log("Mesage",req.body.message);

    //--Send action to API for persistence
    actionParsed=JSON.parse(req.body.message);
    const actionData={
        "dispositivo":actionParsed.Device,
        "usuario":actionParsed.usuario,
        "comando":actionParsed.Command,
        "parametro":actionParsed.Parameter,
        "ts":new Date().getTime(),
        "token":req.headers.authorization
    }
    configAxios.headers.Authorization=actionData.token;
    console.log("Command to API");
    console.log("Route:",apiConf.actionRoute);
    console.log("Message:",actionData);
    put('http://'+apiConf.url+':'+apiConf.port+apiConf.actionRoute, actionData,configAxios);
};

//--Attributes from POST route /attribute
exports.RpcAtt = (req,res) => {
    //--Send message to broker
    mqttHandler.sendMessage(mqttConf.attributeTopic,req.body.message);

    //--Response to UI
    res.status(200).send("Mensaje de atributo enviado al broker: "+req.body.message);

    //--log to console
    console.log("Attibute to broker");
    console.log('Topic:',mqttConf.attributeTopic);
    console.log("Mesage",req.body.message);
    //--Send attribute to API for persistence
    //--TODO in API
};

//--PUT data to API
async function put(url, body, configAxios) {
    try {
      const response = await axios.put(url, body, configAxios);
      console.log("API response",response.data);
      return response.data;
    } 
    catch (err) {
      console.log("Error", err);
      return (err);
    }
}