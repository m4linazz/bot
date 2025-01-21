require('dotenv').config({path: '../../.env'});

const config = {
    token: process.env.TELEGRAM_BOT_TOKEN,
};

module.exports = config;
