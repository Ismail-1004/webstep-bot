const { Bot, Keyboard, InlineKeyboard } = require('grammy')
const utils = require('./utils/index.js')
const db = require('./config/db.json')

const bot = new Bot('8081276139:AAHRGaZOFf63LSOnJM9W22LOFt2Kw8KfCxs')


bot.command('start', async (ctx) => {
    const startKeyboard = new Keyboard()
        .text('На главную ↩️')
        .text('Изменить язык 🇷🇺')
        .resized()

    const inlineKeyboard = new InlineKeyboard()
        .text('Бесплатные мероприятия', 'free_events')
        .row()
        .text('Реферальная программа')
        .row()
        .url('Сайт', 'https://webstep.co.uz')
        .row()
        .switchInlineCurrent('Курсы', 'курсы')
        .text('Информация')
        .row()
        .text('Контакты')
        .text('Обратная связь')


    await ctx.reply(db.start.hello_msg, {
        reply_markup: startKeyboard
    })
    await ctx.reply(db.start.info_msg, {
        reply_markup: inlineKeyboard
    })
})

bot.on('inline_query', async (ctx) => {
    const query = ctx.inlineQuery.query;
    
    if (query === 'курсы') {        
        const coursesList = [
            { text: 'Веб-программирование', description: 'Создание сайтов и веб-приложений', callback_data: 'web', image_url: "https://webstep.co.uz/images/bot/web.png" },
            { text: 'Python', description: 'Создание телеграмм ботов, онлайн магазинов и веб-приложений', callback_data: 'python', image_url: "https://webstep.co.uz/images/bot/python.png" },
            { text: 'Dropshipping', description: 'Создание онлайн магазина, выход на продажи', callback_data: 'dropship', image_url: "https://webstep.co.uz/images/bot/drop.png" },
            { text: 'Интернет-маркетинг', description: 'SMM, иследование целевой аудитории, таргет', callback_data: 'smm', image_url: "https://webstep.co.uz/images/bot/smm.png" },
            { text: 'Логистика', description: 'Поиск грузов и водителей', callback_data: 'logist', image_url: "https://webstep.co.uz/images/bot/logist.png" },
            { text: 'Scratch', description: 'Программирование для детей, создание игр и анимаций', callback_data: 'scratch', image_url: "https://webstep.co.uz/images/bot/scratch.png" },
        ];

        const inlineResults = coursesList.map(course => ({
            type: 'article',
            id: course.callback_data,
            title: course.text,
            description: course.description,
            thumb_url: course.image_url,
            input_message_content: {
                message_text: `${course.text}\n\n${course.description}`,
                media: {
                    type: 'photo',
                    media: course.image_url,
                    caption: course.description,
                },
            },
        }));
        
        await ctx.answerInlineQuery(inlineResults);
    }
});

bot.on('callback_query:data', async (ctx) => {
    const data = ctx.callbackQuery.data;
    if (data === 'free_events') return await utils.freeEvents(ctx)
    console.log(data);
});

bot.on('chosen_inline_result', async (ctx) => {
    console.log(123123123);
    console.log(ctx.chosenInlineResult.result_id); // Ловим ID выбранного элемента
});

bot.start()

