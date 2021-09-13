const fs = require('fs');

const mqttConf = {
    host: 'mqtts://192.168.1.42',
    username: '',
    password: '',
    reconnectPeriod: 2000,
    commandTopic: 'device/command',
    attributeTopic: 'device/attribute',
    telemetryTopic: 'device/telemetry',
    key: fs.readFileSync('./certs/client.key'),
    cert: fs.readFileSync('./certs/client.crt'),
    ca: fs.readFileSync('./certs/ca.crt'),
}
module.exports = mqttConf;