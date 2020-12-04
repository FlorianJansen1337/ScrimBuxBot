import { Message } from 'discord.js';
import { Team } from './../helper/types';
import * as fs from 'fs';
const teams = require('../data/teams.json') as Team[];

export const editteam = function (msg: Message, args: string[]) {
    const teamMention = msg.mentions!.roles!.first();

    if (!teamMention)
        return msg.channel.send("pls ping team")

    if (args.findIndex((w: string) => w.toLowerCase().includes("voiceid")) === -1)
        return msg.channel.send("pls gib more info")

    fs.writeFileSync('./data/backup/teams.json.backup', JSON.stringify(teams, null, 2));

    const teamIndex = teams.findIndex((team: Team) => team.teamID === teamMention.id);

    if (teamIndex > -1) {
        teams[teamIndex] = {
            teamID: teamMention.id,
            teamName: teamMention.name,
            voiceID: args[args.findIndex((w: string) => w.toLowerCase().includes("voiceid"))].split('=')[1]
        } as Team;

        fs.writeFileSync('./data/teams.json', JSON.stringify(teams, null, 2));
        return msg.channel.send("Team has been edited")
    }
}

export const help = function (msg: Message) {
    msg.channel.send(`Example \`${process.env.PREFIX}editTeam @pingTeam voiceID=123456789012345678\``)
}
