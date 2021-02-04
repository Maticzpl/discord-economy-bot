"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Dependencies
const Discord = require("discord.js");
const Chalk = require("chalk");
const cmd_manager_1 = require("./commands/cmd-manager");
const cmd_base_1 = require("./commands/cmd-base");
const config_json_1 = require("./config.json"); //importing json files in typescript is weird
//globals
const client = new Discord.Client();
const cmd_manager = new cmd_manager_1.CommandManager();
client.on("ready", async () => {
    console.log(Chalk.green("Bot Started"));
});
client.on("message", async (message) => {
    if (!message.content.startsWith(`${config_json_1.prefix}`)) {
    }
    else {
        //execute command if it exists
        const cmd_data = new cmd_base_1.CommandDataIn(client, message);
        cmd_manager.checkCommand(cmd_data);
    }
});
client.login(config_json_1.token);
