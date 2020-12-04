import { Contract } from './../helper/types';
import { Message } from 'discord.js';
import * as fs from 'fs';
const contracts = require('../data/contracts.json') as Contract[];


export const editcontract = function (msg: Message, args: string[]) {
    const user = msg.mentions!.users!.first();
    const role = msg.mentions!.roles!.first();

    if (args.length === 0)
        return msg.channel.send("gib info")

    if (!user)
        return msg.channel.send("pls ping ppl")

    if (!role)
        return msg.channel.send("pls ping role")

    if (args.findIndex((w: string) => w.toLowerCase().includes("wage")) === -1 ||
        args.findIndex((w: string) => w.toLowerCase().includes("travel")) === -1 ||
        args.findIndex((w: string) => w.toLowerCase().includes("attendance")) === -1 ||
        args.findIndex((w: string) => w.toLowerCase().includes("start")) === -1 ||
        args.findIndex((w: string) => w.toLowerCase().includes("end")) === -1)
        return msg.channel.send("pls gib more info")

    fs.writeFileSync('./data/backup/contracts.json.backup', JSON.stringify(contracts, null, 2));

    const contractIndex = contracts.findIndex((contract: Contract) => contract.userID === user.id);

    if (contractIndex > -1) {
        contracts[contractIndex] = {
            userID: user.id,
            username: user.username,
            paycheck: {
                wage: parseInt(args[args.findIndex((w: string) => w.toLowerCase().includes("wage"))].split('=')[1]),
                travel: parseInt(args[args.findIndex((w: string) => w.toLowerCase().includes("travel"))].split('=')[1]),
                attendance: parseInt(args[args.findIndex((w: string) => w.toLowerCase().includes("attendance"))].split('=')[1]),
            },
            starHour: parseInt(args[args.findIndex((w: string) => w.toLowerCase().includes("start"))].split('=')[1]),
            endHour: parseInt(args[args.findIndex((w: string) => w.toLowerCase().includes("end"))].split('=')[1]),
            teamID: role.id
        } as Contract;

        fs.writeFileSync('./data/contracts.json', JSON.stringify(contracts, null, 2));
        return msg.channel.send("Player contract edited")
    }
}

export const help = function (msg: Message) {
    msg.channel.send(`Example \`${process.env.PREFIX}editContract @pingPlayer @pingTeam wage=123 travel=123 attendance=123 start=0 end=0\``)
}
