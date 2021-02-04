"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandManager = void 0;
const cmd_base_1 = require("./cmd-base");
const help_1 = require("./help");
const account_1 = require("./account");
class CommandManager {
    constructor() {
        cmd_base_1.CommandList.push(new help_1.Help);
        cmd_base_1.CommandList.push(new account_1.Account);
    }
    checkCommand(data) {
        let cmd_name = data.Message.content.split(" ")[0].slice(1).toLowerCase(); //slice off prefix
        let cmd = cmd_base_1.CommandList.find(command => command.name == cmd_name
            ||
                command.aliases.includes(cmd_name));
        if (cmd)
            cmd.execute(data);
        return;
    }
}
exports.CommandManager = CommandManager;
