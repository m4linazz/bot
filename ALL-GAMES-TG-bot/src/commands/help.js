const helpCommand = (ctx) => {
    ctx.reply(`
Список команд:
/start - Главное меню
/help - Справка
Игры:
1. Орел и Решка: Напишите /play_coinflip
2. Камень, Ножницы, Бумага: Напишите /play_rps
3. Угадай Число: Напишите /play_guess
`);
};

module.exports = helpCommand;
