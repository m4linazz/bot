const errorHandler = async (ctx, next) => {
    try {
        await next(); // Пытаемся выполнить следующую команду
    } catch (error) {
        console.error(error);
        await ctx.reply('Что-то пошло не так, попробуйте снова позже.');
    }
};

module.exports = errorHandler;