import {Command,CommandDataIn,CommandList} from "./cmd-base";

import {Help} from "./help" ;
import {Account} from "./account";


export class CommandManager{
    constructor(){
        CommandList.push(new Help);
        CommandList.push(new Account);
    }
    
    checkCommand(data: CommandDataIn){
        CommandList.forEach((cmd)=>{
            let name = data.Message.content.split(' ')[0].slice(1);

            let nameMatch = false;
            if(cmd.name == name)
                nameMatch = true;
            else
            {
                cmd.aliases.forEach((alias)=>{
                    if (alias == name) {
                        nameMatch = true;
                    }
                });
            }

            if (nameMatch) {
                cmd.execute(data);
                return;
            }

        });
    }
}