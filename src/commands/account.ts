import * as Discord from "discord.js";

import {Command,CommandDataIn,CommandList} from "./cmd-base";


export class Account implements Command{
    name = "account";
    description = "Make operation on your account";
    usage = "account [create]";
    aliases = ["me","acc"];

    async execute(dataIn :CommandDataIn){    
        let params = dataIn.Message.content.split(" ");
        let operation = params[1];
        
        if (operation == undefined) { //NONE
            let balance = await dataIn.Storage.getData(`balance${dataIn.Message.author.id}`);
            if (balance != undefined)
                dataIn.Message.reply(`Your balance is: ${balance}`);
            else
                dataIn.Message.reply(`Your dont have an account`);           

        }
        else if (operation == "create") { //CREATE
            let balance = await dataIn.Storage.getData(`balance${dataIn.Message.author.id}`);
           
            if (balance != undefined)
                dataIn.Message.reply("You already have an account");
            else
            {
                dataIn.Storage.setData(`balance${dataIn.Message.author.id}`,0).then(()=>{
                    dataIn.Message.reply("Account created");
                });
            }
        }
    }
}      

