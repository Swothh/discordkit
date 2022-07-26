import { CommandInteraction } from 'discord.js';
import { ICommandOptions } from '.';
import { Bot } from '../structures';

export interface ICommand {
    name: string;
    description: string;
    options?: ICommandOptions[];
    permissions?: bigint[];
    permCheck?: (bot: Bot, interaction: CommandInteraction) => Promise<boolean> | boolean;
    noPerm?: (bot: Bot, interaction: CommandInteraction) => Promise<any> | any;
    run: (bot: Bot, interaction: CommandInteraction) => Promise<any> | any;
};