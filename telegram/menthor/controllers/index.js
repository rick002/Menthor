const services = require('../services/index.js');
const mainController = {};

mainController.start = (context) => {
    if (context) {
        context.reply(`
        Hi ${services.name(context)}, my name is menthor and I'm your wikipedia assistant. Choose one of the following options:
        1. /start
        2. /help
        3. Input what do you want to read.`);
    }
}

mainController.help = (context) => {
    if (context) {
        context.reply(`
        Hey there ${services.name(context)}, choose one of the following options: 
        1. /start
        2. /help
        3. Input what do you want to read.`);
    }
}

mainController.findByKeyword = async (context) => {
    if (context) {
        let resource = '';
        await services.find(context.update.message.text)
            .then(page => page.url())
            .then(url => resource = url)
            .catch(error => resource = `Sorry, that's not in wikipedia`);
        context.reply(resource);
    }
}

mainController.sticker = (context) => {
    context.reply(`Wuao ${services.name(context)} you really like stickers!!`);
}


module.exports = mainController;