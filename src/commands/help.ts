import * as Discord from "discord.js";

import {Command,CommandDataIn,CommandList} from "./cmd-base";
const {prefix} = require("../config.json");


export namespace Commands{

    export class Help implements Command{
        name = "help";
        description = "Lists all the commands";
        usage = "help [command name]";
        aliases = ["commands"];

        execute(dataIn :CommandDataIn){    
            let params = dataIn.Message.content.split(" ");
            
            if (params[1]) {
                let cmd = CommandList.find(command => command.name == params[1] || command.aliases.includes(params[1]));
                
                if(cmd){
                    let aliasString = "";
                    cmd.aliases.forEach(alias => {
                        aliasString += alias;
                    });

                    let embed = new Discord.MessageEmbed()
                    .setTitle(cmd.name.toUpperCase())
                    .setDescription(cmd.description+"\n**Aliases:** "+aliasString);
    
                    dataIn.Message.channel.send(embed); 
                }
                else
                    dataIn.Message.channel.send(`Command *${params[1]}* not found`);

            } else {              

                let embed = new Discord.MessageEmbed()
                .setTitle("Commands")
                .setDescription("You can specify the command to show a detailed description of a command \n\n**<>** is a demanded parameter \n**[]** is optional parameter");

                CommandList.forEach((command)=>{
                    embed.addField(`${command.name.toUpperCase()} - ${command.description}`
                    ,`Usage: \`${prefix}${command.usage}\``);

                });           
                dataIn.Message.channel.send(embed); 
            }
        }
    }      

}
