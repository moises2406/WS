require("dotenv").config();
const qrcode = require("qrcode-terminal");
const DB = require("./model/model");
require("./db");

//
const { Client } = require("whatsapp-web.js");

const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

//TODO: recive el msg creado de la persona que quieres y guardalo
client.on("message_create", async (message) => {
  const { body, from, to, timestamp } = message;
  if (from === "18096521285@c.us" && to === "18294257496@c.us") {
    const db = new DB({ body, from, to, timestamp });
    console.log(db);
    await db.save();
  }
});

//TODO: recive el msg de la persona que quieres y guardalo
client.on("message", async (message) => {
  const { body, from, to, timestamp } = message;
  if (from === "18294257496@c.us" && to === "18096521285@c.us") {
    const db = new DB({ body, from, to, timestamp });
    console.log(db);
    await db.save();
  }
});

client.on("ready", () => {
  //io.emit("ready", "ready");
  console.log("Client is ready!");
});

client.initialize();
