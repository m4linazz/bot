const { InlineKeyboard } = require('grammy');

const startCommand = (ctx) => {
    const keyboard = new InlineKeyboard()
        .text('Орел и Решка', 'play_coinflip')
        .text('Камень, Ножницы, Бумага', 'play_rps ')
        .row()
        .text('Угадай Число', 'play_guess');

    ctx.reply('Привет! Выбери игру из списка ниже:', { reply_markup: keyboard });
};

module.exports = startCommand;
