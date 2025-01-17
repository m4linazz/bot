const { Bot } = require('grammy');

const bot =  new Bot('7537706398:AAGypSlwAJ7E3v8JtloMFXt5HlJzfAI3VOM');

bot.command('start', (ctx) => {
    ctx.reply('привет! устал от одиночества? напиши /help, чтобы узнать, что я умею!😘');
});


bot.command('help', (ctx) => {
    ctx.reply('/start - приветствие🌸\n/help - помощь🌸\n/echo - повторить сообщение🌸\n/cute - комплимент🌸');
});

bot.command('echo', (ctx) => {
    const message = ctx.message.text.split(' ').slice(1).join(' ');
    ctx.reply(message || 'солнышко, введи сообщение для повторения🎀')
});

bot.command('cute', async (ctx) => {
    const cuties = [
    'venom', 'что в мешочке?', 'щовл',
    ]

const randomCute = cuties[Math.floor(Math.random() * cuties.length)];
await ctx.reply(randomCute);
});

bot.start();
console.log('Бот запущен...');