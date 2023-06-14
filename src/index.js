require("dotenv").config();
const qrcode = require("qrcode-terminal");
const DB = require("./model/model");
const io = require("./socket");

//
const { Client, RemoteAuth } = require("whatsapp-web.js");

// Require database
const { MongoStore } = require("wwebjs-mongo");
const mongoose = require("mongoose");

// Load the session data
mongoose.connect(process.env.MONGODB_URI).then(() => {
  const store = new MongoStore({ mongoose: mongoose });
  const client = new Client({
    authStrategy: new RemoteAuth({
      store: store,
      backupSyncIntervalMs: 300000,
    }),
  });

  client.on("qr", (qr) => {
    io.emit("WS", qr);
  });

  io.on("WSC", (msg) => {
    qrcode.generate(msg, { small: true });
  });

  //TODO: recive el msg creado de la persona que quieres y guardalo
  client.on("message_create", async (message) => {
    const { body, from, to, timestamp } = message;
    if (from === "18096521285@c.us" && to === "18294257496@c.us") {
      const db = new DB({ body, from, to, timestamp });
      console.log(db);
    }
  });

  //TODO: recive el msg de la persona que quieres y guardalo
  client.on("message", async (message) => {
    const { body, from, to, timestamp } = message;
    if (from === "18294257496@c.us" && to === "18096521285@c.us") {
      const db = new DB({ body, from, to, timestamp });
      console.log(db);
    }
  });

  client.on("ready", () => {
    io.emit("ready", "ready");
    console.log("Client is ready!");
  });

  client.initialize();
});

// Load the session data if it has been previously saved
