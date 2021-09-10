const axios = require('axios');
const mqttConf = require('../config/mqtt.config.js');
const apiConf = require('../config/api.config.js');
const configAxios = { 
  headers: {
    'Content-Type': 'application/json'
    } 
  }


exports.toApi = (topic, message) => {
  if (topic==mqttConf.telemetryTopic){
    console.log("Telemetry to API");
    console.log("Route:",apiConf.telemetryRoute);
    console.log("Message:",message.toString());
    put('http://'+apiConf.url+':'+apiConf.port+apiConf.telemetryRoute, message.toString(),configAxios);
  }
  if (topic==mqttConf.attributeTopic){
    put('http://'+apiConf.url+':'+apiConf.port+apiConf.attributeRoute, message.toString(),configAxios);
  }
  if (topic==mqttConf.commandTopic){
    configAxios.headers.Authorization=message.token;
    console.log("Command to API");
    console.log("Route:",apiConf.actionRoute);
    console.log("Message:",message);
    post('http://'+apiConf.url+':'+apiConf.port+apiConf.actionRoute, message,configAxios);
    
  }
}  

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

