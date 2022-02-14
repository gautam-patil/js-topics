// import the `Kafka` instance from the kafkajs library
const { Kafka } = require("kafkajs")

// the client ID lets kafka know who's producing the messages
const clientId = "my-app"
const topic = "message"
// we can define the list of brokers in the cluster
const brokers = ["localhost:9092"]

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer()
producer.connect()
// we define an async function that writes a new message each second
const produce = async (data) => {
	let i = 0;
	console.log(data);
	
			try {
				// send a message to the configured topic with
				// the key and value formed from the current value of `i`
				producer.send({
					topic,
					messages: [
						{
							key: 'message',
							value: data.message,
						},
					],
				})

				// if the message is written successfully, log it and increment `i`
				console.log("produce-1: ", i)
				i++;
			} catch (err) {
				console.error("could not write message " + err)
			}
		
}

module.exports = produce