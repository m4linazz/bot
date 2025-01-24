require('dotenv').config();

const port = process.env.PORT || 3000;
const debugMode = process.env.DEBUG === 'true';

console.log(`Сервер запущен на порту: ${port}`);
console.log(`Режим отладки: ${debugMode ? 'Включен' : 'Выключен'}`);

const { Bot, InlineKeyboard } = require('grammy');


const bot = new Bot( '7923942822:AAFzYVLSuMwSUlboOSmXb09gzSS8l-CMWmQ');


bot.command('start', (ctx) => {
    ctx.reply('Привет! Устал от одиночества? Напиши /help, чтобы узнать, что я умею! 😘');
});


bot.command("delete", async (ctx) => {
    await ctx.api.deleteMessage(ctx.chat.id, ctx.message.message_id);
  
  });


bot.command("replace", async (ctx) => {
  
    await ctx.api.deleteMessage(ctx.chat.id, ctx.message.message_id);

  
    await ctx.reply("Это новое сообщение вместо старого!");
  
  });


bot.command('safe_delete', async (ctx) => {
    try {
        await ctx.api.deleteMessage(ctx.chat.id, ctx.message.message_id);
    } catch (error) {
        console.log("Не удалось удалить сообщение:", error.description);
        await ctx.reply("Сообщение уже удалено или нет прав 😢");
    }
});


bot.command('timed_delete', async (ctx) => {
    const sentMessage = await ctx.reply("Это сообщение удалится через 5 секунд.");
    setTimeout(async () => {
        try {
            await ctx.api.deleteMessage(sentMessage.chat.id, sentMessage.message_id);
        } catch (error) {
            console.log("Не удалось удалить сообщение:", error.description);
        }
    }, 5000);
});


bot.command('delete_button', async (ctx) => {
    await ctx.reply("Нажмите кнопку, чтобы удалить это сообщение:", {
        reply_markup: new InlineKeyboard().text("Удалить меня", "delete_message"),
    });
});


bot.callbackQuery("delete_message", async (ctx) => {
    try {

        await ctx.api.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id);

        await ctx.answerCallbackQuery({ text: "Сообщение удалено! ✅" });
    } catch (error) {
        console.error("Ошибка при удалении сообщения:", error);
        await ctx.answerCallbackQuery({ text: "Ошибка при удалении 😢", show_alert: true });
    }
});

bot.start();
console.log('Бот запущен...');
