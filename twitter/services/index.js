console.log('VOICER IS STARTING');

const Twit = require('twit');
const fs = require('fs');
const config = require('./bot.config');

const T = new Twit(config);

console.log('VOICER HAS STARTED');

const processingIMG = () => {
    console.log('<POST> PROCCESING IMAGE');
    const filename = './assets/img/figma-mobile.png';
    const params = { enconding: 'base64' };
    const b64content = fs.readFileSync(filename, params);

    T.post('media/upload', { media_data: b64content }, (err, data, response) => {
        console.log('UPLOADED IMAGE');
        const id = data.media_id_string;
        console.log(data);
        console.log(err);
        console.log(response);
        /*
        const tweet = {
            status: 'This is a design replicated in Figma.',
            media_ids: [id],
        };
        
        T.post('statuses/update', tweet, (err, data, response) => {
            if (err) {
                console.log('Something Went Wrong!!');
            } else {
                console.log('It Worked!');
            }
        });*/
    });
}

const twitIt = (message) => {
    console.log('[ENTERING twitIt()]: void');

    let tweet = { status: `#coding From NODE a simple text` };
    if (message) {
        tweet = { status: message };
    }
    T.post('statuses/update', tweet, (err, data, response) => {
        if (err) {
            console.log('Something Went Wrong');
            console.log(err);
        } else {
            console.log('It Worked!.');
        }
    });
}

twitIt();
// setInterval(twitIt, 1000 * 20);
// processingIMG();