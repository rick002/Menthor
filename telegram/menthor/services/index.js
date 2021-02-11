// INCLUDING Wiki JS
const wiki = require('wikijs').default;
const services = {};

services.find = (keyword) => {
    if (keyword) {
        return wiki().page(keyword);
    }
}

services.name = (context) => {
    if (context) {
        return context.update.message.from.first_name;
    }
}

module.exports = services;
