// Basic app configuration
const dotenv = require('dotenv').config();
const Telegraf = require('telegraf').Telegraf;
const BOT = new Telegraf(process.env.BOT_TOKEN);

// Controllers module inclusion
const MAIN_CONTROLLER = require('./controllers');

// BOT core commands configuration
BOT.start(context => MAIN_CONTROLLER.start(context));
BOT.help(context => MAIN_CONTROLLER.help(context));
BOT.on('text', context => MAIN_CONTROLLER.findByKeyword(context));
BOT.on('sticker', context => MAIN_CONTROLLER.sticker(context));

// RUNNING BOT
BOT.launch();