import { Message } from 'discord.js';
import { Team } from '../helper/types';
import * as fs from 'fs';
const teams = require('../../data/teams.json') as Team[];

export const deleteteam = function (msg: Message, args: string[]) {
    const teamMention = msg.mentions!.roles!.first();

    if (!teamMention)
        return msg.channel.send("pls ping team")

    fs.writeFileSync('./data/backup/teams.json.backup', JSON.stringify(teams, null, 2));

    const teamIndex = teams.findIndex((team: Team) => team.teamID === teamMention.id);

    if (teamIndex > -1) {
        teams.splice(teamIndex);

        fs.writeFileSync('./data/teams.json', JSON.stringify(teams, null, 2));
        return msg.channel.send("Team has been deleted")
    } else
        return msg.channel.send("Team not found")
}

export const help = function (msg: Message) {
    msg.channel.send(`Example \`${process.env.PREFIX}deleteTeam @pingTeam\``)
}
