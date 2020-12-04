# ScrimBuxBot

ScrimBuxBot is a bot for entertainment. After adding contracts for your community members they earn ScrimBux on the first every month and when "being present at work during work hours", which essentially just means being in the designated voice channels.

## Requirements

Since the Tool is written in TypeScript, [Node.js](https://nodejs.org/en/) is required to run the application.

To run the bot, including restarts in case it crashes, a process manger like [pm2](https://pm2.keymetrics.io/) is necessary.

## Configuration

The Configuration of this tool is done via environment variables.

To set up those, create a `.env` file in the root directory of the tool.

The following variables are necessary to run the tool 

| Variable | type | Meaning |
|:--- |:---:| ---:|
| TOKEN | string | The login token for the bot. |
| PREFIX |  string | The prefix the bot uses to identify chat commands. |
| ALTERNATE_ADMIN_ROLE |  string | The role ID to lock permissions behind additional to the check for `ADMINISTRATION` permissions. |

Example:
```
TOKEN=<insert token here>
PREFIX=--
ALTERNATE_ADMIN_ROLE=123456789012345678
```

## Additional Configuration

The bot requires certain files and directories for data to be stored in.

You will need to manually create those files and directories in the project `root`: 

```bash
data
├── backup
│   └──...
├── balances.json
├── contracts.json
└── teams.json
```

The three `JSON` files also need to be filled with an empty array.

## Usage

First install all the `node-modules` required by executing the command:

```
npm install
```

Once everything is installed all that's left is starting up the tool by executing:

```
pm2 start ecosystem.config.js
```
