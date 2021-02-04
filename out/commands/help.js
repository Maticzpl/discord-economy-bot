"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Help = void 0;
const Discord = require("discord.js");
const cmd_base_1 = require("./cmd-base");
const { prefix } = require("../config.json");
class Help {
    constructor() {
        this.name = "help";
        this.description = "Lists all the commands";
        this.usage = "help [command name]";
        this.aliases = ["commands"];
    }
    execute(dataIn) {
        let params = dataIn.Message.content.split(" ");
        if (params[1]) {
            let cmd = cmd_base_1.CommandList.find(command => command.name == params[1] || command.aliases.includes(params[1]));
            if (cmd) {
                let aliasString = "";
                cmd.aliases.forEach(alias => {
                    aliasString += `${alias},`;
                });
                aliasString = aliasString.slice(0, aliasString.length - 1);
                let embed = new Discord.MessageEmbed()
                    .setTitle(cmd.name.toUpperCase())
                    .setDescription(cmd.description + "\n**Aliases:** " + aliasString);
                dataIn.Message.channel.send(embed);
            }
            else
                dataIn.Message.channel.send(`Command *${params[1]}* not found`);
        }
        else {
            let embed = new Discord.MessageEmbed()
                .setTitle("Commands")
                .setDescription("You can specify the command to show a detailed description of a command \n\n**<>** is a demanded parameter \n**[]** is optional parameter");
            cmd_base_1.CommandList.forEach((command) => {
                embed.addField(`${command.name.toUpperCase()} - ${command.description}`, `Usage: \`${prefix}${command.usage}\``);
            });
            dataIn.Message.channel.send(embed);
        }
    }
}
exports.Help = Help;
