const gameState = {};

const playGuess = (ctx) => {
    const userId = ctx.from.id;

    const randomNumber = Math.floor(Math.random() * 100) + 1;
    gameState[userId] = { number: randomNumber, attempts: 0 };

    ctx.reply('Я загадал число от 1 до 100. Попробуй угадать!');
};

const handleGuess = (ctx) => {
    const userId = ctx.from.id;

    if (!gameState[userId]) {
        ctx.reply('Напиши /play_guess, чтобы начать новую игру.');
        return;
    }

    const userGuess = parseInt(ctx.message.text, 10);

    if (isNaN(userGuess)) {
        ctx.reply('Пожалуйста, введи число.');
        return;
    }

    const { number, attempts } = gameState[userId];
    gameState[userId].attempts += 1;

    if (userGuess === number) {
        ctx.reply(`Поздравляю! Ты угадал число ${number} за ${attempts + 1} попыток! 🎉`);
        delete gameState[userId];
    } else {
        ctx.reply(userGuess < number ? 'Моё число больше.' : 'Моё число меньше.');
    }
};

module.exports = { playGuess, handleGuess };
