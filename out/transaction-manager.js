"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions = void 0;
const Storage = require("./storage");
const storage = new Storage.DefaultStorage();
class TransactionManager {
    async addCredit(userID, ammount) {
        return new Promise(async (resolve, reject) => {
            const target = `users.${userID}.money`;
            let current = await storage.getData(target);
            if (!current)
                current = 0;
            let money = current + ammount;
            if (money < 0)
                money = 0;
            await storage.setData(target, money);
            resolve(money);
        });
    }
    async getCredit(userID) {
        return new Promise(async (resolve, reject) => {
            const target = `users.${userID}.money`;
            let money = await storage.getData(target);
            if (!money)
                money = 0;
            if (money < 0)
                money = 0;
            resolve(money);
        });
    }
    async transfer(fromId, toId, ammount) {
        return new Promise(async (resolve, reject) => {
            let moneyFrom = await this.getCredit(fromId);
            if (moneyFrom < ammount)
                reject("User doesn't have enough money");
            else {
                this.addCredit(fromId, -ammount);
                this.addCredit(toId, ammount);
                resolve(ammount);
            }
        });
    }
}
exports.Transactions = new TransactionManager;
