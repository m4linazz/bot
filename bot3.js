const { Bot, InlineKeyboard } = require('grammy');

const bot = new Bot('YOUR_BOT_TOKEN'); // Замените на ваш токен

bot.command('start', (ctx) => {
    const keyboard = new InlineKeyboard()
        .text('Орел и Решка', 'game_coin')
        .row()
        .text('Камень, Ножницы, Бумага', 'game_rps');

    ctx.reply('Привет! Выбери игру:', { reply_markup: keyboard });
});

bot.command('help', (ctx) => {
    ctx.reply(
        '/start - приветствие и выбор игры\n' +
        '/help - помощь\n' +
        '/play_coin - сыграть в Орел и Решка\n' +
        '/play_rps - сыграть в Камень, Ножницы, Бумага'
    );
});

// Игра "Орел и Решка"
bot.command('play_coin', (ctx) => {
    const keyboard = new InlineKeyboard()
        .text('Орел', 'orel')
        .text('Решка', 'reshka');

    ctx.reply('Выбери Орел или Решка:', { reply_markup: keyboard });
});

// Игра "Камень, Ножницы, Бумага"
bot.command('play_rps', (ctx) => {
    const keyboard = new InlineKeyboard()
        .text('Камень 🪨', 'rock')
        .text('Ножницы ✂️', 'scissors')
        .text('Бумага 📄', 'paper');

    ctx.reply('Выбери Камень, Ножницы или Бумагу:', { reply_markup: keyboard });
});

bot.on('callback_query:data', async (ctx) => {
    const data = ctx.callbackQuery.data;

    // Логика для игры "Орел и Решка"
    if (data === 'orel' || data === 'reshka') {
        const result = Math.random() < 0.5 ? 'orel' : 'reshka';
        const userChoice = data === 'orel' ? 'Орел' : 'Решка';
        const botResult = result === 'orel' ? 'Орел' : 'Решка';

        const resultMessage = userChoice === botResult
            ? `Ты выбрал ${userChoice}, и это совпало! 🎉 Сыграем еще раз?`
            : `Ты выбрал ${userChoice}, но выпал ${botResult}. 😞 Сыграем еще раз?`;

        const playAgainKeyboard = new InlineKeyboard()
            .text('Да', 'play_coin_again')
            .text('Нет', 'no_thanks');

        await ctx.reply(resultMessage, { reply_markup: playAgainKeyboard });
    }

    // Логика для игры "Камень, Ножницы, Бумага"
    else if (['rock', 'scissors', 'paper'].includes(data)) {
        const choices = ['rock', 'scissors', 'paper'];
        const botChoice = choices[Math.floor(Math.random() * choices.length)];

        const choiceToEmoji = {
            rock: 'Камень 🪨',
            scissors: 'Ножницы ✂️',
            paper: 'Бумага 📄',
        };

        let resultMessage;

        if (data === botChoice) {
            resultMessage = `Ты выбрал ${choiceToEmoji[data]}, и я выбрал ${choiceToEmoji[botChoice]}. Это ничья! 🤝`;
        } else if (
            (data === 'rock' && botChoice === 'scissors') ||
            (data === 'scissors' && botChoice === 'paper') ||
            (data === 'paper' && botChoice === 'rock')
        ) {
            resultMessage = `Ты выбрал ${choiceToEmoji[data]}, и я выбрал ${choiceToEmoji[botChoice]}. Ты победил! 🎉`;
        } else {
            resultMessage = `Ты выбрал ${choiceToEmoji[data]}, и я выбрал ${choiceToEmoji[botChoice]}. Я победил! 😈`;
        }

        const playAgainKeyboard = new InlineKeyboard()
            .text('Сыграть снова', 'play_rps_again')
            .text('Завершить', 'no_thanks');

        await ctx.reply(resultMessage, { reply_markup: playAgainKeyboard });
    }

    // Повтор игр
    else if (data === 'play_coin_again') {
        ctx.reply('Напиши /play_coin, чтобы сыграть снова!');
    } else if (data === 'play_rps_again') {
        ctx.reply('Напиши /play_rps, чтобы сыграть снова!');
    }

    // Завершение
    else if (data === 'no_thanks') {
        ctx.reply('Спасибо за игру! Возвращайся еще. 😊');
    }

    await ctx.answerCallbackQuery(); // Закрытие уведомления
});

bot.start();
console.log('Бот запущен...');
