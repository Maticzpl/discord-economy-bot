import * as Discord from "discord.js";
import * as Storage from "../storage";


export class CommandDataIn {
    constructor(
         client :Discord.Client,
         message :Discord.Message
        ){
        this.DiscordClient = client;
        this.Message = message;
    }

    DiscordClient: Discord.Client;
    Message: Discord.Message;
}

export interface Command {
    name    : string;
    description : string;
    usage   : string;
    aliases : string[];

    execute(dataIn :CommandDataIn) :void;
}


export var CommandList = new Array<Command>();