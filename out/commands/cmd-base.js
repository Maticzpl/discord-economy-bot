"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandList = exports.CommandDataIn = void 0;
class CommandDataIn {
    constructor(client, message) {
        this.DiscordClient = client;
        this.Message = message;
    }
}
exports.CommandDataIn = CommandDataIn;
exports.CommandList = new Array();
