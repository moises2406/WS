require('dotenv').config();
const qrcode = require('qrcode-terminal');
require('./db');
const DB = require('./model/model');
const io = require('./socket');

const { Client,NoAuth } = require('whatsapp-web.js');
//

// Load the session data if it has been previously saved
const client = new Client({
    authStrategy: new NoAuth()
});

client.on('qr', qr => {
    io.emit('WS',qr)
});

io.on('WSC',(msg) =>{
    console.log(msg);
})

//TODO: recive el msg creado de la persona que quieres y guardalo
client.on('message_create', async message => {
    const {body,from,to,timestamp}= message;
    if (from === '18498033413@c.us' && to === '18096521285@c.us' ) {
        const db = new DB({body,from,to,timestamp});
        await db.save();
    }
});

//TODO: recive el msg de la persona que quieres y guardalo
client.on('message', async message => {
	const {body,from,to,timestamp}= message;
    if (from === '18096521285@c.us'  && to === '18498033413@c.us') {
        const db = new DB({body,from,to,timestamp});
        await db.save();
    }
});


client.on('ready', () => {
    io.emit('ready','ready')
    console.log('Client is ready!');
});

client.initialize();


 

 