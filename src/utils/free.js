const { InlineKeyboard } = require('grammy')
const db = require('../config/db.json')

async function freeEvents (ctx) {
    const inlineKeyboard = new InlineKeyboard()
    .text('Записаться на бесплатный открытый урок', 'free_events_callback')

    await ctx.reply(db.free_events.info_msg, {
        reply_markup: inlineKeyboard
    });

}

module.exports = freeEvents 