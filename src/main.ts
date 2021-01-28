import * as Discord from "discord.js";
import * as Chalk from "chalk";

const {token,prefix} = require("./config.json"); //importing json files in typescript is weird

const client = new Discord.Client();

client.on("ready",()=>{
    console.log(Chalk.green("Bot Started"));
});

client.on("message",(message)=>{
    if (!message.content.startsWith(`${prefix}`))
        return;
    
    let params = message.content.split(" ");

    if (params[0] == `${prefix}ping`) {
        message.channel.send("pnog");
    }    
});


client.login(token);