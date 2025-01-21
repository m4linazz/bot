const { Bot, InlineKeyboard } = require('grammy');

const bot = new Bot('7099636603:AAEIgRG4KhP7ao6d2mDASxvr_CRWfMySwm8'); 

const gameState = {};

bot.command('start', (ctx) => {
    ctx.reply('Привет! Давай сыграем в "Угадай число"! Напиши /play, чтобы начать! 😊');
});

bot.command('help', (ctx) => {
    ctx.reply('/start - приветствие\n/help - помощь\n/play - начать игру "Угадай число"');
});

bot.command('play', (ctx) => {
    const userId = ctx.from.id;


    const randomNumber = Math.floor(Math.random() * 100) + 1;
    gameState[userId] = { number: randomNumber, attempts: 0 };

    ctx.reply('Я загадал число от 1 до 100. Попробуй угадать! Напиши число:');
});

bot.on('message:text', (ctx) => {
    const userId = ctx.from.id;


    if (!gameState[userId]) {
        ctx.reply('Напиши /play, чтобы начать новую игру.');
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
        ctx.reply(`Поздравляю! Ты угадал число ${number} за ${attempts + 1} попыток! 🎉\nНапиши /play, чтобы сыграть снова!`);
        delete gameState[userId];
    } else if (userGuess < number) {
        ctx.reply('Моё число больше. Попробуй ещё раз!');
    } else {
        ctx.reply('Моё число меньше. Попробуй ещё раз!');
    }
});

bot.start();
console.log('Бот запущен...');
