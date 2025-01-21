const { InlineKeyboard } = require('grammy');

const playRPS = (ctx) => {
    const keyboard = new InlineKeyboard()
        .text('Камень', 'rock')
        .text('Ножницы', 'scissors')
        .text('Бумага', 'paper');

    ctx.reply('Выбери Камень, Ножницы или Бумагу:', { reply_markup: keyboard });
};

const handleRPS = async (ctx) => {
    const data = ctx.callbackQuery.data;
    const choices = { rock: 'Камень', scissors: 'Ножницы', paper: 'Бумага' };

    if (['rock', 'scissors', 'paper'].includes(data)) {
        const botChoiceKey = ['rock', 'scissors', 'paper'][Math.floor(Math.random() * 3)];
        const userChoice = choices[data];
        const botChoice = choices[botChoiceKey];

        const resultMessage = data === botChoiceKey
            ? `Ты выбрал ${userChoice}, я выбрал ${botChoice}. Ничья! 😉`
            : (data === 'rock' && botChoiceKey === 'scissors') ||
              (data === 'scissors' && botChoiceKey === 'paper') ||
              (data === 'paper' && botChoiceKey === 'rock')
            ? `Ты выбрал ${userChoice}, я выбрал ${botChoice}. Ты выиграл! 🎉`
            : `Ты выбрал ${userChoice}, я выбрал ${botChoice}. Я выиграл! 😜`;

        await ctx.reply(resultMessage);
    }
};

module.exports = { playRPS, handleRPS };
