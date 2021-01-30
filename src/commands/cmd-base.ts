import * as Discord from "discord.js";
import * as Storage from "../storage";


export class CommandDataIn {
    constructor(
         client :Discord.Client,
         storage :Storage.StorageInterface,
         message :Discord.Message
        ){
        this.DiscordClient = client;
        this.Storage = storage;
        this.Message = message;
    }

    DiscordClient: Discord.Client;
    Storage: Storage.StorageInterface;
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