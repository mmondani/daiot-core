const axios = require('axios');
const mqttHandler = require('../mqtt/mqttHandler.js');
const mqttConf = require('../config/mqtt.config.js');
const apiConf = require('../config/api.config.js');
const configAxios = { 
    headers: {
      'Content-Type': 'application/json'
      } 
}

//--Commands from POST route/command
exports.RpcComm = (req,res) => {
    //--Send message to broker
    rc=mqttHandler.sendMessage(mqttConf.commandTopic,req.body.message);
    if (rc==true){
      //--Response to UI
      res.status(200).send("Command sent to broker: "+req.body.message);

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
  }
  else{
    //--No mqtt connection
    res.status(200).send("Commnad not sent. MQTT disconnected "+req.body.message);
    console.log("Commnad not sent. MQTT disconnected")
  }
};

//--Attributes from POST route /attribute
exports.RpcAtt = (req,res) => {
    //--Send message to broker
    rc=mqttHandler.sendMessage(mqttConf.attributeTopic,req.body.message);
    if (rc==true){
      //--Response to UI
      res.status(200).send("Attribute sent to broker: "+req.body.message);

      //--log to console
      console.log("Attibute to broker");
      console.log('Topic:',mqttConf.attributeTopic);
      console.log("Mesage",req.body.message);
      //--Send attribute to API for persistence
      //--TODO in API
    }
    else{
      //--If no mqtt connection
      res.status(200).send("Attribute not sent. MQTT disconnected "+req.body.message);
      console.log("Attribute not sent. MQTT disconnected")
  }
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