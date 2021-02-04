"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const transaction_manager_1 = require("./../transaction-manager");
class Account {
    constructor() {
        this.name = "account";
        this.description = "Make operation on your account";
        this.usage = "account";
        this.aliases = ["me", "acc"];
    }
    async execute(dataIn) {
        let params = dataIn.Message.content.split(" ");
        let operation = params[1];
        if (operation == undefined) { //NONE
            let balance = await transaction_manager_1.Transactions.getCredit(dataIn.Message.author.id);
            dataIn.Message.reply(`Your balance is: ${balance}`);
        }
    }
}
exports.Account = Account;
