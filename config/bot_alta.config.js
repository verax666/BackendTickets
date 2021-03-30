const TelegramBot = require('node-telegram-bot-api');
// replace the value below with the Telegram token you receive from // @BotFather
token = '1687894814:AAHi5cYJortF3Z3se_jVYiXzDrnUvda5aJU';// Create and Save a new Order
exports.bot = new TelegramBot(token, { polling: true });

