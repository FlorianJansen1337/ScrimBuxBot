import { Snowflake } from "discord.js";

export type Contract = {
    userID: Snowflake,
    username: string,
    paycheck: {
        wage: number,
        travel: number,
        attendance: number
    },
    starHour: number,
    endHour: number,
    teamID: Snowflake
};

export type Team = {
    teamID: Snowflake,
    teamName: string,
    voiceID: Snowflake
};

export type Balance = {
    userID: Snowflake,
    amount: number
}
