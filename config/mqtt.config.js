const fs = require('fs');

const mqttConf = {
    host: 'mqtts://192.168.1.42',
    username: '',
    password: '',
    commandTopic: 'device/command',
    attributeTopic: 'device/atttribute',
    telemetryTopic: 'device/telemetry',
    key: fs.readFileSync('./certs/client.key'),
    cert: fs.readFileSync('./certs/client.crt'),
    ca: fs.readFileSync('./certs/ca.crt'),
    
    // Necessary only if the server's cert isn't for "localhost".
    //checkServerIdentity: () => { return null; },

}
module.exports = mqttConf;