const TelegramApi = require('node-telegram-bot-api');
const dotenv = require('dotenv');

dotenv.config();

// routes: /[command]
// request: /[command]_[method]

// keyboards: [keyboard: [steps], keyboard]
// callback_query: [command]_[method]?step=[step]&[query]

const bot = new TelegramApi(process.env.BOT_TOKEN, { polling: true });

const complimentTagsForm = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                { text: 'Lovely', callback_data: 'lovely' }, 
                { text: 'Motivation', callback_data: 'motivation' }, 
                { text: 'Wishes', callback_data: 'wishes' }
            ]
        ]
    })
};

const compliemntCommands = [
    { command: '/compliment_add', description: 'Добавить комплимент' },
    { command: '/compliment_get', description: 'Получить случайный комплимент' }
]

bot.setMyCommands([
    ...compliemntCommands
]);

bot.on("message", (msg) => {
    if (msg.text === compliemntCommands[0].command) {
        return bot.sendMessage(msg.chat.id, 'Укажите тег:', complimentTagsForm);
    }

    return;
});

bot.on('callback_query', (query) => {    
    bot.editMessageText("Введите содержание комплимента: ", { 
        chat_id: query.message.chat.id,
        message_id: query.message.message_id
    });

    bot.editMessageReplyMarkup('', { 
        chat_id: query.message.chat.id, 
        message_id: query.message.message_id
    });
});