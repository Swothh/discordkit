import { Command, OptionType, CommandPermissions } from '../../src';

export default new Command({
    name: 'ping',
    description: 'Ping!',
    options: [
        {
            type: OptionType.String,
            name: 'test',
            description: 'Test option',
            required: true
        }
    ],
    permissions: [
        CommandPermissions.Administrator
    ],
    run: async (bot, interaction) => {
        return interaction.reply({
            content: `:ping_pong: Pong! (${bot.ws.ping}ms)`
        });
    }
});