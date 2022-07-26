import { Client, Collection } from 'discord.js';
import { ICommand } from '../interfaces';
import { REST } from '@discordjs/rest';
import { Command, Event } from '.';
declare module 'discord.js' {
    interface Client {
        on(event: 'commandsLoad', listener: (time: number) => Promise<any> | any): this;
    }
}
export declare class Bot extends Client {
    commands: Collection<string, Command>;
    defaultNoPerm: ICommand['noPerm'];
    slashReady: boolean;
    restApi: REST;
    addCommand(commands: Command | Command[]): void;
    addEvent(events: Event | Event[]): void;
    loadCommands(): Promise<void>;
    setDefaultNoPerm(callback: ICommand['noPerm']): void;
    init(token: string): void;
}
