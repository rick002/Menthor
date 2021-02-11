// Basic app configuration
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const Telegraf = require('telegraf').Telegraf;

const PORT = process.env.PORT || 5000;

// Setting BOT Config
let BOT = {};
if (process.env.NODE_ENV === 'production') {
    BOT = new Telegraf(process.env.BOT_TOKEN);
    BOT.setWebHook(process.env.HEROKU_URL + process.env.BOT_TOKEN);
} else {
    BOT = new Telegraf(process.env.BOT_TOKEN);
}
// Controllers module inclusion
const MAIN_CONTROLLER = require('./controllers');

// Http server configuration
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({ message: 'Welcome to Menthor'})
});

app.post(`/${process.env.BOT_TOKEN}`, (req, res) => {
    BOT.processUpdate(req.body);
    res.status(200).json({ message: 'ok' });
});

app.listen(PORT, () => console.log(`\n\n Server Running At Port: ${PORT}\n\n`));

// BOT core commands configuration
BOT.start(context => MAIN_CONTROLLER.start(context));
BOT.help(context => MAIN_CONTROLLER.help(context));
BOT.on('text', context => MAIN_CONTROLLER.findByKeyword(context));
BOT.on('sticker', context => MAIN_CONTROLLER.sticker(context));

// RUNNING BOT
BOT.launch();