const { Kafka} = require("kafkajs")

const clientId = "my-app-2"
const brokers = ["localhost:9092"]
const topic = "message"

const kafka = new Kafka({
	clientId,
	brokers,
})

// the kafka instance and configuration variables are the same as before

// create a new consumer from the kafka client, and set its group ID
// the group ID helps Kafka keep track of the messages that this client
// is yet to receive
const consumer = kafka.consumer({
	groupId: clientId,
	minBytes: 5,
	maxBytes: 1e6,
	// wait for at most 3 seconds before receiving new data
	maxWaitTimeInMs: 3000,
})
	consumer.connect()
 	consumer.subscribe({ topic, fromBeginning: true })
const consume = async (socket) => {
	// first, we wait for the client to connect and subscribe to the given topic
	
	await consumer.run({
		// this function is called every time the consumer gets a new message
		eachMessage: ({ partition, message }) => {
			// here, we just log the message to the standard output
			
			console.log(`received message consume-1: ${message.value}`)
			console.log('Partition= '+partition);
			socket.broadcast.emit('message', message.value.toString());
		},
	})
}

module.exports = consume