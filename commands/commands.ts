import { Message } from 'discord.js';
import * as fs from 'fs';

export const commands = function (msg: Message, args: string[]) {
    let commandList = fs.readdirSync(process.cwd() + '/commands');
    commandList = commandList.map(item => item.split('.')[0])
    return msg.channel.send(commandList)
}

export const help = function (msg: Message) {
    msg.channel.send(`\`${process.env.PREFIX}commands\` 4Head`)
}
