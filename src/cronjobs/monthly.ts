import { CronJob } from 'cron';
import { Balance, Contract } from "../helper/types";
import * as fs from 'fs';
const contracts = require('../../data/contracts.json') as Contract[];
const balances = require('../../data/balances.json') as Balance[];

export const monthly = new CronJob('0 0 1 * *', function () {
    payOutWage();
}, null, true, 'Europe/Berlin');

const payOutWage = () => {
    fs.writeFileSync('./data/backup/balances.json.backup', JSON.stringify(balances, null, 2));

    contracts.forEach((contract: Contract) => {
        let balanceIndex = balances.findIndex((item: Balance) => item.userID === contract.userID)
        if (balanceIndex > -1)
            balances.find((item: Balance) => item.userID === contract.userID)!.amount += contract.paycheck.wage;
        else
            balances.push({ userID: contract.userID, amount: contract.paycheck.wage } as Balance)
    });
    fs.writeFileSync('./data/balances.json', JSON.stringify(balances, null, 2));
    console.log("distributed monthly wage")
};
