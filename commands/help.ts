import { Message } from 'discord.js';

export const help = function (msg: Message, args: string[]) {
    if (!args)
        return msg.channel.send("no...")
    if (args.length > 0)
        return require(`../commands/${args[0]}`).help(msg);
    else
        msg.channel.send(`\`${process.env.PREFIX}help <command name>\``)
}
