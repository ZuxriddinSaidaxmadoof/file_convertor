"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
// import { inlineKeyboard } from "telegraf";
const token = "6941832197:AAGHHf1I5QVHGKXsRXmMGbb_8db825jj2oM";
const bot = new telegraf_1.Telegraf(token);
var Language;
(function (Language) {
    Language["ru"] = "russian";
    Language["uz"] = "uzbek";
    Language["en"] = "english";
})(Language || (Language = {}));
const button = telegraf_1.Markup.inlineKeyboard([
    telegraf_1.Markup.button.callback('uz 🇺🇿', 'small'),
    telegraf_1.Markup.button.callback('en 🇬🇧', 'medium'),
    telegraf_1.Markup.button.callback('ru 🇷🇺', 'large')
    // "uz 🇺🇿", "en 🇬🇧", "ru 🇷🇺"
]);
const languageButton = {
    keyboard: [
        ["uz 🇺🇿", "en 🇬🇧", "ru 🇷🇺"]
    ],
    resize_keyboard: true
};
bot.start((ctx) => {
    ctx.language = Language.en;
    ctx.reply("Welcome to file editor bot, please chose language", button);
});
bot.launch();
