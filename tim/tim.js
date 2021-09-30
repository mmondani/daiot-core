const axios = require('axios');
const mqttConf = require('../config/mqtt.config.js');
const apiConf = require('../config/api.config.js');
const configAxios = { 
  headers: {
    'Content-Type': 'application/json'
    } 
  }

//--Process telemetry and attribute arrived from broker
exports.timProc = (topic, message) => {
  if (topic==mqttConf.telemetryTopic){
    console.log("Telemetry to API");
    console.log("Route:",apiConf.telemetryRoute);
    console.log("Message:",message.toString());

    //--Send telemetry data to API for persistence
    put('http://'+apiConf.url+':'+apiConf.port+apiConf.telemetryRoute, message.toString(),configAxios);
  }
  else if (topic==mqttConf.attributeTopic){
    console.log("Attribute to API");
    console.log("Route:",apiConf.attributeRoute);
    console.log("Message:",message.toString());
    
    //--Send attribute data to API for persistence
    //--TODO in API
    //put('http://'+apiConf.url+':'+apiConf.port+apiConf.attributeRoute, message.toString(),configAxios);
  }
  else if (topic==mqttConf.actionTopic){
    console.log("Canal to API");
    console.log("Route:",apiConf.canalRoute);
    console.log("Message:",message.toString());
    
    //--Send telemetry data to API for persistence
    put('http://'+apiConf.url+':'+apiConf.port+apiConf.canalRoute, message.toString(),configAxios);
  }
  else if (topic==mqttConf.statusTopic){
    console.log("Status to API");
    console.log("Route:",apiConf.statusRoute);
    console.log("Message:",message.toString());
    
    //--Send telemetry data to API for persistence
    put('http://'+apiConf.url+':'+apiConf.port+apiConf.statusRoute, message.toString(),configAxios);
  }
}  

//--Put data to API
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

//--POST data to API
async function post(url, body, configAxios) {
  try {
    const response = await axios.post(url, body, configAxios);
    console.log("API response",response.data);
    return response.data;
  } 
  catch (err) {
    console.log("Error", err);
    return (err);
  }
}

