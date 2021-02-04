import * as Discord from "discord.js";

import {Command,CommandDataIn,CommandList} from "./cmd-base";
import {Transactions} from "./../transaction-manager";


export class Account implements Command{
    name = "account";
    description = "Make operation on your account";
    usage = "account";
    aliases = ["me","acc"];

    async execute(dataIn :CommandDataIn){    
        let params = dataIn.Message.content.split(" ");
        let operation = params[1];
        
        if (operation == undefined) { //NONE
            let balance = await Transactions.getCredit(dataIn.Message.author.id);
           
            dataIn.Message.reply(`Your balance is: ${balance}`);        

        }
    }
}      

