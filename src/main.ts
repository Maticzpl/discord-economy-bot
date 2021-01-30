import * as Discord from "discord.js";
import * as Chalk from "chalk";
import * as Storage from "./storage";
const {token,prefix} = require("./config.json"); //importing json files in typescript is weird


const client = new Discord.Client();
const storage = new Storage.JsonStorage();



client.on("ready",()=>{
    storage.setData("test","hello there");
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