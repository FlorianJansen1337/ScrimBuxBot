import { Message, Client, Role } from "discord.js";
import { monthly } from './cronjobs/monthly';
import { attandence } from './cronjobs/attandence';

const client = new Client();

//start cronjobs for scrim/ monthly payouts
client.on('ready', () => {
    monthly.start();
    attandence(client);
});

client.on('ready', () => {
    client.user!.setActivity(`${process.env.PREFIX}commands`);
});

client.on('message', (msg: Message) => {
    if (msg.content.startsWith(process.env.PREFIX!)) {
        const commandName = (msg.content.replace(process.env.PREFIX!, "").split(' ')[0]);
        let args = msg.content.slice(msg.content.indexOf(' ')).split(' ') as string[];

        let kcRoleIndex = msg.member!.roles.cache.array().findIndex((role: Role) => role.id === process.env.ALTERNATE_ADMIN_ROLE);

        if ((commandName !== "commands" && commandName !== "help") && (!msg.member!.hasPermission("ADMINISTRATOR") && kcRoleIndex > -1))
            return msg.channel.send("command not available for plebians");

        for (let i = 0; i > -1; i = args.indexOf('')) {
            args.splice(i, 1);
        }
        try {
            require(`./commands/${commandName}`)[commandName.toLowerCase()](msg, args);
        } catch (e) {
            console.log(e)
            msg.channel.send("not a command, scrub!");
        }
    }
});

client.login(process.env.TOKEN);
