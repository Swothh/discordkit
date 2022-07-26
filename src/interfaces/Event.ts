import { ClientEvents } from 'discord.js';
import { EventType } from '../enums';
import { Bot } from '../structures';

export interface IEvent {
    name: keyof ClientEvents;
    type: EventType;
    run: (bot: Bot, ...args: any) => Promise<any> | any;
};