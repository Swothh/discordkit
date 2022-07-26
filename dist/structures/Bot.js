"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const discord_js_1 = require("discord.js");
const v10_1 = require("discord-api-types/v10");
const rest_1 = require("@discordjs/rest");
const _1 = require(".");
;
class Bot extends discord_js_1.Client {
    commands = new discord_js_1.Collection();
    defaultNoPerm;
    slashReady = false;
    restApi;
    addCommand(commands) {
        if (!Array.isArray(commands))
            commands = [commands];
        commands.forEach(cmd => {
            if (cmd instanceof _1.Command) {
                this.commands.set(cmd.name, cmd);
            }
            else {
                throw new Error(cmd + ' must be an instance of Command.');
            }
            ;
        });
    }
    ;
    addEvent(events) {
        if (!Array.isArray(events))
            events = [events];
        events.forEach(event => {
            if (event instanceof _1.Event) {
                this[event.type](event.name, event.run.bind(null, this));
            }
            else {
                throw new Error(event + ' must be an instance of Event.');
            }
            ;
        });
    }
    ;
    async loadCommands() {
        if (typeof this.restApi === 'undefined')
            return;
        const body = this.commands.map(cmd => cmd.toJSON());
        await this.restApi.put(v10_1.Routes.applicationCommands(this.user.id), { body });
        this.slashReady = true;
    }
    ;
    setDefaultNoPerm(callback) {
        this.defaultNoPerm = callback;
    }
    ;
    init(token) {
        this.restApi = new rest_1.REST({ version: '10' })
            .setToken(token);
        this.login(token).catch((err) => {
            console.error(err);
            process.exit(1);
        });
        this.once('ready', async () => {
            try {
                const now = Date.now();
                await this.loadCommands();
                this.emit('commandsLoad', Date.now() - now);
            }
            catch (err) {
                console.error(err);
                process.exit(1);
            }
            ;
        });
        this.on('interactionCreate', async (interaction) => {
            try {
                if (interaction.type !== discord_js_1.InteractionType.ApplicationCommand || !this.slashReady)
                    return;
                const defaultReply = async (_, i) => await i.reply({ content: ':x: **|** You are not authorized.' });
                const command = this.commands.find(cmd => cmd.name === interaction.commandName);
                if (!command)
                    return;
                const noAuth = (command.permissions ?? []).find(perm => !(interaction.memberPermissions?.has?.(perm) ?? false)) ?? false;
                const checkPerm = (await command.permCheck?.(this, interaction)) ?? true;
                if (noAuth || !checkPerm)
                    return await (command.noPerm ?? (this.defaultNoPerm ?? defaultReply))?.(this, interaction);
                command.run(this, interaction);
            }
            catch (err) {
                console.error(err);
                process.exit(1);
            }
            ;
        });
    }
    ;
}
exports.Bot = Bot;
;
