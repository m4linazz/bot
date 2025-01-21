const { Bot } = require('grammy');

const bot = new Bot('7537706398:AAGypSlwAJ7E3v8JtloMFXt5HlJzfAI3VOM');


bot.command('start', (ctx) => {
    ctx.reply('привет! устал от одиночества? напиши /help, чтобы узнать, что я умею!😘');
});


bot.command('help', (ctx) => {
    ctx.reply('/start - приветствие🌸\n/help - помощь🌸\n/echo - повторить сообщение🌸\n/cute - комплимент🌸');
});


bot.command('echo', (ctx) => {
    const message = ctx.message.text.split(' ').slice(1).join(' ');
    ctx.reply(message || 'солнышко, введи сообщение для повторения🎀');
});


bot.command('cute', async (ctx) => {
    const cuties = [
        'Ты светишься, как солнце в ясный день! ☀️',
        'Ты — настоящая звезда! ⭐',
        'У тебя потрясающая улыбка! 😊'
    ];
    const randomCute = cuties[Math.floor(Math.random() * cuties.length)];
    await ctx.reply(randomCute);
});


bot.command('markdown', (ctx) => {
    ctx.reply(
        '*Пример оформления текста в Markdown:*\n\n\\- _Курсив_\n\\- *Жирный текст*\n\\- `Моноширинный текст`',
        { parse_mode: 'MarkdownV2' }
    );
});



bot.command('html', (ctx) => {
    ctx.reply('Пример оформления текста в HTML:\n<b>Жирный текст</b>\n<i>Курсив</i>\n<code>Моноширинный текст</code>', { parse_mode: 'HTML' });
});


bot.start();
console.log('Бот запущен...');
