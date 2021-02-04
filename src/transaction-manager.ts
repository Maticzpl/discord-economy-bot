import * as Storage from "./storage";

const storage = new Storage.DefaultStorage();

class TransactionManager{

    async addCredit(userID: string, ammount: number) : Promise<number>{

        return new Promise(async (resolve,reject)=>{
            const target = `users.${userID}.money`;
            let current = await storage.getData(target) as number;
    
            if (!current)
                current = 0;
    
            let money = current + ammount;
    
            if (money < 0) 
                money = 0;

            await storage.setData(target,money);

            resolve(money);
        });
    }

    async getCredit(userID: string) : Promise<number>
    {
        return new Promise(async (resolve,reject)=>{
            const target = `users.${userID}.money`;
            let money = await storage.getData(target) as number;

            if(!money)
                money = 0;       
                
            if (money < 0) 
                money = 0;         

            resolve(money);
        });
    }

    async transfer(fromId : string, toId : string, ammount : number) : Promise<any>{
        return new Promise(async (resolve,reject)=>{
            let moneyFrom = await this.getCredit(fromId);
            if (moneyFrom < ammount) 
                reject("User doesn't have enough money");
            else{
                this.addCredit(fromId,  -ammount);
                this.addCredit(toId,    ammount);
                resolve(ammount);
            }          
            
        });       
    }

}

export const Transactions = new TransactionManager;