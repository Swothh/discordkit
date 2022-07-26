import { Bot, Intents, FileLoader, Event, Command, EventType } from '../src';
import { Token } from './config.test';
import { join } from 'path';

const bot = new Bot({
    intents: [
        Intents.GuildMembers,
        Intents.GuildMessages,
        Intents.Guilds,
        Intents.MessageContent
    ]
});

bot.init(Token);

const loader = new FileLoader<Command>(join(__dirname, './commands'));

loader.on('error', err => {
    console.error(err);
});

loader.on('finish', time => {
    bot.addCommand(loader.files);
    console.log(`Loaded ${loader.files.length} commands in ${time}ms`);
});

bot.on('commandsLoad', time => {
    console.log(`Commands loaded in ${time}ms`);
});

const msg = new Event({
    name: 'messageCreate',
    type: EventType.On,
    run: (bot, msg) => {
        console.log(`[${msg.author.tag}]: ${msg.content}`);
    }
})

bot.addEvent(msg);