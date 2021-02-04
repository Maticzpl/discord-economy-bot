import * as fs from "fs";

import {Command,CommandDataIn,CommandList} from "./cmd-base";

import {Help} from "./help" ;
import {Account} from "./account";

export class CommandManager{
    constructor(){        
        CommandList.push(new Help);
        CommandList.push(new Account);
    }
    
    checkCommand(data: CommandDataIn){        
        let cmd_name = data.Message.content.split(" ")[0].slice(1).toLowerCase(); //slice off prefix

        let cmd = CommandList.find(command => 
            command.name == cmd_name
            ||
            command.aliases.includes(cmd_name)
        );
               
        if(cmd)
            cmd.execute(data);

        return;          
    }
}