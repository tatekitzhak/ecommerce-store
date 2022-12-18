/**
 * https://github.com/Automattic/mongoose/issues/11198
 */
const testSchema = new mongoose.Schema({
    user1: {
        type: Number,
        required: true,
        index: true
    },
    user2: {
        type: Number,
        required: true,
        index: true
    },
    messages: [{
        sender: {
            type: Number,
            required: true,
            index: true
        },
        receiver: {
            type: Number,
            required: true,
            index: true
        },
        message: String,
        document: {

            type: String,
            required: true
        },
        image: String,
        sent: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            default: 'sent'
        },
    }]
});

const Test = mongoose.model('Test', testSchema);


async function run() {
    await mongoose.connect('mongodb://localhost:27017/test', {
    });

    await mongoose.connection.dropDatabase();

    const entry = await Test.create({
        user1: 5,
        user2: 8,
        messages: [{ sender: 3, receiver: 4, message: 'Test', document: 'Testerson', image: 'Hi', status: '' }]
    });
    await Test.create({
        user1: 5,
        user2: 8,
        messages: [{ sender: 3, receiver: 4, message: 'Test', document: 'Testerson', image: 'Hi', status: '' }]
    });
    await Test.create({
        user1: 5,
        user2: 8,
        messages: [{ sender: 3, receiver: 4, message: 'Test', document: 'Testerson', image: 'Hi', status: '' }, { sender: 3, receiver: 4, message: 'Test', document: 'Testerson', image: 'Hi', status: '' }]
    });
    console.log(entry);
    const test = await Test.updateMany({ "messages.$.sender": 3 }, { $set: { "messages.$.status": 'read' } }, { multi: true });

    console.log(test);
    console.log(await Test.findOne())
    console.log('done');
    const result = await Test.find();
    console.log(result);
    console.log(result[0].messages[0]);
    console.log(result[1].messages[0]);
    console.log(result[2].messages[0]);
    console.log(result[2].messages[1])
}
run();