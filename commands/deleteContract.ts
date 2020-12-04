import { Contract } from './../helper/types';
import { Message } from 'discord.js';
import * as fs from 'fs';
const contracts = require('../data/contracts.json') as Contract[];

export const deletecontract = function (msg: Message, args: string[]) {
    const user = msg.mentions!.users!.first();

    if (args.length === 0)
        return msg.channel.send("gib info")

    if (!user)
        return msg.channel.send("pls ping ppl")

    fs.writeFileSync('./data/backup/contracts.json.backup', JSON.stringify(contracts, null, 2));

    const contractIndex = contracts.findIndex((contract: Contract) => contract.userID === user.id);

    if (contractIndex > -1) {
        contracts.splice(contractIndex, 1)

        fs.writeFileSync('./data/contracts.json', JSON.stringify(contracts, null, 2));
        return msg.channel.send("Player contract deleted")
    }
}

export const help = function (msg: Message) {
    msg.channel.send(`Example \`${process.env.PREFIX}deleteContract @pingPlayer\``)
}
