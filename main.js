var mqtt         = require('mqtt');
var config       = require('./config');

var mqttUri  = 'mqtt://' + config.mqtt.hostname + ':' + config.mqtt.port;

var collection = null;

var client   = mqtt.connect(mqttUri);

//faz conexão com o mqtt, se conecta ao referido tópico e publica uma mensagem nesse tópico
client.on('connect', function () {
    client.subscribe(config.mqtt.namespace);
    client.publish(config.mqtt.namespace, "YURI");
});



//estrutura crud: dentalcenter/caller/mac/get