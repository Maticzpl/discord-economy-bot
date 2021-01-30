//Dependencies
import * as Discord from "discord.js";
import * as Chalk from "chalk";

//Local
import * as Storage from "./storage";
import { CommandManager } from "./commands/cmd-manager";
import { CommandDataIn } from "./commands/cmd-base";
const {token,prefix} = require("./config.json"); //importing json files in typescript is weird

//globals
const client = new Discord.Client();
const storage = new Storage.DefaultStorage();
const cmd_manager = new CommandManager();




client.on("ready",async ()=>{
    console.log(Chalk.green("Bot Started"));    
});

client.on("message",async (message)=>{
    if (!message.content.startsWith(`${prefix}`))
        return;        
        
    const cmd_data = new CommandDataIn(
        client,storage,message
    );

    cmd_manager.checkCommand(cmd_data);
});

client.login(token);