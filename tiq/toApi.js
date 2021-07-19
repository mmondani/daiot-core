const axios = require('axios');
const mqttConf = require('../config/mqtt.config.js');
const apiConf = require('../config/api.config.js');
const configAxios = { headers: {'Content-Type': 'application/json'} }


exports.toApi = (topic, message) => {
  //console.log('topico:',topic);
  //console.log('mensaje:',message.toString());
  if (topic==mqttConf.telemetryTopic){
    put('http://'+apiConf.url+':'+apiConf.port+apiConf.telemetryRoute, message.toString(),configAxios);
  }
  if (topic==mqttConf.attributeTopic){
    put('http://'+apiConf.url+':'+apiConf.port+apiConf.attributeRoute, message.toString(),configAxios);
  }
}  

async function put(url, body, configAxios) {
    try {
        const response = await axios.put(url, body, configAxios);
        return response.data;
    } 
    catch (err) {
        throw getError(err);
    }
}

