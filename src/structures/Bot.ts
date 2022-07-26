import { Client, Collection, InteractionType } from 'discord.js';
import { Routes } from 'discord-api-types/v10';
import { ICommand } from '../interfaces';
import { REST } from '@discordjs/rest';
import { Command, Event } from '.';

declare module 'discord.js' {
    interface Client {
        on(event: 'commandsLoad', listener: (time: number) => Promise<any> | any): this;
    }
};

export class Bot extends Client {
    public commands: Collection<string, Command> = new Collection();
    public defaultNoPerm: ICommand['noPerm'];
    public slashReady: boolean = false;
    public restApi: REST;

    public addCommand(commands: Command | Command[]): void {
        if (!Array.isArray(commands)) commands = [ commands ];
        commands.forEach(cmd => {
            if (cmd instanceof Command) {
                this.commands.set(cmd.name, cmd);
            } else {
                throw new Error(cmd + ' must be an instance of Command.');
            };
        });
    };

    public addEvent(events: Event | Event[]): void {
        if (!Array.isArray(events)) events = [ events ];
        events.forEach(event => {
            if (event instanceof Event) {
                this[event.type](event.name, event.run.bind(null, this));
            } else {
                throw new Error(event + ' must be an instance of Event.');
            };
        });
    };

    public async loadCommands(): Promise<void> {
        if (typeof this.restApi === 'undefined') return;
        const body = this.commands.map(cmd => cmd.toJSON());
        await this.restApi.put(Routes.applicationCommands(this.user.id), { body });
        this.slashReady = true;
    };

    public setDefaultNoPerm(callback: ICommand['noPerm']): void {
        this.defaultNoPerm = callback;
    };

    public init(token: string): void {
        this.restApi = new REST({ version: '10' })
            .setToken(token);

        this.login(token).catch((err: Error) => {
            console.error(err);
            process.exit(1);
        });

        this.once('ready', async () => {
            try {
                const now = Date.now();
                await this.loadCommands();
                this.emit('commandsLoad', Date.now() - now);
            } catch(err) {
                console.error(err);
                process.exit(1);
            };
        });

        this.on('interactionCreate', async interaction => {
            try {
                if (interaction.type !== InteractionType.ApplicationCommand || !this.slashReady) return;
                const defaultReply: ICommand['noPerm'] = async (_, i) => await i.reply({ content: ':x: **|** You are not authorized.' });
                const command = this.commands.find(cmd => cmd.name === interaction.commandName);
                if (!command) return;

                const noAuth = (command.permissions ?? []).find(perm => !(interaction.memberPermissions?.has?.(perm) ?? false)) ?? false;
                const checkPerm = (await command.permCheck?.(this, interaction)) ?? true;
                if (noAuth || !checkPerm) return await (command.noPerm ?? (this.defaultNoPerm ?? defaultReply))?.(this, interaction);
                command.run(this, interaction);
            } catch(err) {
                console.error(err);
                process.exit(1);
            };
        });
    };
};