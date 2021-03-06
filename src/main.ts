//Dependencies
import * as Discord from "discord.js";
import * as Chalk from "chalk";

//Local
import * as MoneyLogic from "./money-system-logic";
import { CommandManager } from "./commands/cmd-manager";
import { CommandDataIn } from "./commands/cmd-base";

import {token,prefix} from "./config.json"; //importing json files in typescript is weird

//globals
const client = new Discord.Client();
const cmd_manager = new CommandManager();




client.on("ready",async ()=>{
    console.log(Chalk.green("Bot Started"));    
});

client.on("message",async (message)=>{
    if (!message.content.startsWith(`${prefix}`)){  
    }
    else{
        //execute command if it exists
        const cmd_data = new CommandDataIn(
            client,message
        );
        cmd_manager.checkCommand(cmd_data);    
    }
        
});

client.login(token);