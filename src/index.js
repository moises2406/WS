require('dotenv').config();
const qrcode = require('qrcode-terminal');
require('./db');
const DB = require('./model/model');
const io = require('./socket');

const { Client,LocalAuth } = require('whatsapp-web.js');
//

// Load the session data if it has been previously saved
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    //io.emit('WS',qr)
});

io.on('WSC',(msg) =>{
    qrcode.generate(msg, {small: true});
})

//TODO: recive el msg creado de la persona que quieres y guardalo
client.on('message_create', async message => {
    const {body,from,to,timestamp}= message;
    if (from === '18498033413@c.us' && to === '18096521285@c.us' ) {
        const db = new DB({body,from,to,timestamp});
        console.log(db);
        await db.save();
    }
});

//TODO: recive el msg de la persona que quieres y guardalo
client.on('message', async message => {
	const {body,from,to,timestamp}= message;
    if (from === '18096521285@c.us'  && to === '18498033413@c.us') {
        const db = new DB({body,from,to,timestamp});
        console.log(db);
        await db.save();
    }
});


client.on('ready', () => {
    //io.emit('ready','ready')
    console.log('Client is ready!');
});

client.initialize();


 

 