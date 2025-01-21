const { Bot } = require('grammy');
const config = require('./config/botConfig');
const startCommand = require('./commands/start');
const helpCommand = require('./commands/help');
const { playCoinFlip, handleCoinFlip } = require('./commands/playCoinFlip');
const { playRPS, handleRPS } = require('./commands/playRPS');
const { playGuess, handleGuess } = require('./commands/playGuess');

const bot = new Bot(config.token);

bot.command('start', startCommand);
bot.command('help', helpCommand);
bot.command('play_coinflip', playCoinFlip);
bot.command('play_rps', playRPS);
bot.command('play_guess', playGuess);

bot.on('callback_query:data', async (ctx) => {
    const data = ctx.callbackQuery.data;

    try {
        if (data === 'play_coinflip') {
            await playCoinFlip(ctx); 
        } else if (data === 'play_rps') {
            await playRPS(ctx); 
        } else if (data === 'play_guess') {
            await playGuess(ctx); 
        }

        else if (data === 'orel' || data === 'reshka') {
            await handleCoinFlip(ctx); 
        } else if (data === 'rock' || data === 'paper' || data === 'scissors') {
            await handleRPS(ctx); 
        }

        else {
            await ctx.answerCallbackQuery({ text: 'Неизвестное действие.', show_alert: true });
        }

    } catch (err) {
        console.error('Ошибка в обработке callback_query:', err);
    }
});

bot.on('message:text', handleGuess);

module.exports = bot;
