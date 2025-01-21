const { Bot, InlineKeyboard } = require('grammy');

const bot = new Bot('7387266503:AAHApn-sDU8f442Sxay3rjNgJBnixtQBTpo');

bot.command('start', (ctx) => {
    ctx.reply('Привет! Давай сыграем в Камень, Ножницы, Бумага! Напиши /play, чтобы начать! 😊');
});

bot.command('help', (ctx) => {
    ctx.reply('/start - приветствие\n/help - помощь\n/play - сыграть в Камень, Ножницы, Бумага');
});

bot.command('play', (ctx) => {
    const keyboard = new InlineKeyboard()
        .text('Камень', 'rock')
        .text('Ножницы', 'scissors')
        .text('Бумага', 'paper');

    ctx.reply('Выбери Камень, Ножницы или Бумагу:', { reply_markup: keyboard });
});

bot.on('callback_query:data', async (ctx) => {
    const data = ctx.callbackQuery.data;

    if (['rock', 'scissors', 'paper'].includes(data)) {
        const choices = {
            'rock': 'Камень',
            'scissors': 'Ножницы',
            'paper': 'Бумага'
        };

        const botChoiceKey = ['rock', 'scissors', 'paper'][Math.floor(Math.random() * 3)];
        const userChoice = choices[data];
        const botChoice = choices[botChoiceKey];

        let resultMessage;

        if (data === botChoiceKey) {
            resultMessage = `Ты выбрал ${userChoice}, я выбрал ${botChoice}. Ничья! 😉`;
        } else if (
            (data === 'rock' && botChoiceKey === 'scissors') ||
            (data === 'scissors' && botChoiceKey === 'paper') ||
            (data === 'paper' && botChoiceKey === 'rock')
        ) {
            resultMessage = `Ты выбрал ${userChoice}, я выбрал ${botChoice}. Ты выиграл! 🎉`;
        } else {
            resultMessage = `Ты выбрал ${userChoice}, я выбрал ${botChoice}. Я выиграл! 😜`;
        }

        const playAgainKeyboard = new InlineKeyboard()
            .text('Сыграть еще раз', 'play_again')
            .text('Закончить', 'no_thanks');

        await ctx.reply(resultMessage, { reply_markup: playAgainKeyboard });
    } else if (data === 'play_again') {
        ctx.reply('Напиши /play, чтобы сыграть снова!');
    } else if (data === 'no_thanks') {
        ctx.reply('Спасибо за игру! Возвращайся еще. 😊');
    }
});

bot.start();
console.log('Бот запущен...');
