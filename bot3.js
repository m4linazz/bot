const { Bot, InlineKeyboard } = require('grammy');

const bot = new Bot('7547297341:AAFllBgtIb6AoTfGV-5NbwDbJIWpv55K1PI');

bot.command('start', (ctx) => {
    ctx.reply('Привет! Давай сыграем! Напиши /play, чтобы сыграть! 😘');
});

bot.command('help', (ctx) => {
    ctx.reply('/start - приветствие\n/help - помощь\n/play - сыграть в Орел и Решка');
});

bot.command('play', (ctx) => {
    const keyboard = new InlineKeyboard()
        .text('Орел', 'orel')
        .text('Решка', 'reshka')
        .row()
        .text('Помощь', 'help');

    ctx.reply('Выбери Орел или Решка', { reply_markup: keyboard });
});

bot.on('callback_query:data', async (ctx) => {
    const data = ctx.callbackQuery.data;

    if (data === 'orel' || data === 'reshka') {
        const result = Math.random() < 0.5 ? 'orel' : 'reshka'; 
        const userChoice = data === 'orel' ? 'Орел' : 'Решка';
        const botResult = result === 'orel' ? 'Орел' : 'Решка';

        const resultMessage = userChoice === botResult
            ? `Ты выбрал ${userChoice}, и это совпало!🎉 Сыграем еще раз? `
            : `Ты выбрал ${userChoice}, но выпал ${botResult}. 😞 Сыграем еще раз?`;

        const playAgainKeyboard = new InlineKeyboard()
            .text('Да', 'play_again')
            .text('Нет', 'no_thanks');

        await ctx.reply(resultMessage, { reply_markup: playAgainKeyboard });
    } else if (data === 'play_again') {
        ctx.reply('Напиши /play, чтобы сыграть снова!');
    } else if (data === 'no_thanks') {
        ctx.reply('Спасибо за игру! Возвращайся еще. 😊');
    } else if (data === 'help') {
        ctx.answerCallbackQuery('Выберите опцию для получения информации.');
        ctx.reply('/start - приветствие\n/help - помощь\n/play - сыграть в Орел и Решка');
    }
});

bot.start();
console.log('Бот запущен...');
