/*
	Servidor MQTT
*/

var mosca = require('mosca');
var MongoClient  = require('mongodb').MongoClient;
var mqtt         = require('mqtt');
var config       = require('./config');

var mqttUri  = 'mqtt://' + config.mqtt.hostname + ':' + config.mqtt.port;
var mongoUri = 'mongodb://' + config.mongodb.hostname + ':' + config.mongodb.port;

var client   = mqtt.connect(mqttUri);

var settings = {
		port:config.mqtt.port
		}

var server = new mosca.Server(settings);

//servidor mosca (mqtt)
server.on('ready', function(){
	console.log('running server...');

	//estabelece conexão com o referente tópico do mqtt
	client.on('connect', function () {
		client.subscribe(config.mqtt.namespace);
	});

	//escuta o tópico conectado, para receber a messagem
	client.on('message', function (topic, message) {
		var messageObject = {
			topic: topic,
			message: message.toString()
		};
		
		//faz a conexão com o Mongo
		MongoClient.connect(mongoUri, {useNewUrlParser: true}, function(error, database) {
			if(error != null) throw error;
			
			//configura a base do Mongo
			collection = database.db(config.mongodb.database).collection(config.mongodb.collection);
			collection.createIndex( { "topic" : 1 } );
			
			//Insere item na base criada
			collection.insertOne(messageObject, function(error, result) {
				if(error != null) console.log("ERROR: " + error);
			});
		});
	});
});