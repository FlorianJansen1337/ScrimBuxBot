import { Message } from 'discord.js';
import { Team } from '../helper/types';
import * as fs from 'fs';
const teams = require('../../data/teams.json') as Team[];

export const addteam = function (msg: Message, args: string[]) {
    const teamMention = msg.mentions!.roles!.first();
    let dupe = false;

    if (!teamMention)
        return msg.channel.send("pls ping team")

    if (args.findIndex((w: string) => w.toLowerCase().includes("voiceid")) === -1)
        return msg.channel.send("pls gib more info")

    fs.writeFileSync('./data/backup/teams.json.backup', JSON.stringify(teams, null, 2));

    teams.forEach((team: Team) => {
        if (teamMention.id == team.teamID) {
            dupe = true;
            return msg.channel.send("team already exists")
        }
    });

    if (!dupe) {
        teams.push({
            teamID: teamMention.id,
            teamName: teamMention.name,
            voiceID: args[args.findIndex((w: string) => w.toLowerCase().includes("voiceid"))].split('=')[1]
        } as Team);

        fs.writeFileSync('./data/teams.json', JSON.stringify(teams, null, 2));
        return msg.channel.send("Team has been created")
    }
}

export const help = function (msg: Message) {
    msg.channel.send(`Example \`${process.env.PREFIX}addTeam @pingTeam voiceID=123456789012345678\``)
}
