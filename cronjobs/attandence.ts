import { Client, VoiceChannel } from 'discord.js';
import { CronJob } from 'cron';
import { Balance, Contract, Team } from "../helper/types";
import * as fs from 'fs';
const contracts = require('../data/contracts.json') as Contract[];
const balances = require('../data/balances.json') as Balance[];
const teams = require('../data/teams.json') as Team[];

export const attandence = function (client: Client) {
    let scrims = {};
    contracts.forEach((contract: Contract) => {
        scrims = {
            ...scrims,
            [contract.userID]: new CronJob(`* * * * *`, function () {
                // [contract.userID]: new CronJob(`5 ${contract.starHour} * * *`, function () {
                checkIfInVoice(contract, client);
            }, null, true, 'Europe/Berlin')
        }
    });

    Object.keys(scrims).forEach(item => {
        scrims[item].start();
    });
}

const checkIfInVoice = (contract: Contract, client: Client) => {
    const channelID = teams.find((team: Team) => team.teamID === contract.teamID).voiceID
    const vc = client.channels.cache.array().find((channel: VoiceChannel) => channel.id === channelID) as VoiceChannel;

    Array.from(vc.members).forEach((member: any[]) => {
        if (member.includes(contract.userID)) {

            let balanceIndex = balances.findIndex((item: Balance) => item.userID === contract.userID)
            if (balanceIndex > -1)
                balances.find((item: Balance) => item.userID === contract.userID).amount += contract.paycheck.attendance;
            else
                balances.push({ userID: contract.userID, amount: contract.paycheck.attendance } as Balance)
            fs.writeFileSync('./data/balances.json', JSON.stringify(balances, null, 2));
            console.log(`payed out attandence bonus for player: ${contract.username} (<@${contract.userID}>)`)
        }
    });
};
