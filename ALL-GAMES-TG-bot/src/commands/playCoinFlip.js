const { InlineKeyboard } = require('grammy');

const playCoinFlip = (ctx) => {
    const keyboard = new InlineKeyboard()
        .text('Орел', 'orel')
        .text('Решка', 'reshka');

    ctx.reply('Выбери Орел или Решка:', { reply_markup: keyboard });
};

const handleCoinFlip = async (ctx) => {
    const data = ctx.callbackQuery.data;

    if (data === 'orel' || data === 'reshka') {
        const result = Math.random() < 0.5 ? 'orel' : 'reshka';
        const botResult = result === 'orel' ? 'Орел' : 'Решка';
        const userChoice = data === 'orel' ? 'Орел' : 'Решка';

        const message = userChoice === botResult
            ? `Ты выбрал ${userChoice}, и это совпало! 🎉`
            : `Ты выбрал ${userChoice}, но выпал ${botResult}. 😞`;

        await ctx.reply(message);
    }
};

module.exports = { playCoinFlip, handleCoinFlip };
