import * as fs from "fs";


export interface StorageInterface{

    getData(field :string           )   :Promise<any>;
    setData(field :string,data :any )   :Promise<any>;    
    
    readonly source: string;
    readonly storage_map: object;
}

// JSON STORAGE
class JsonStorage implements StorageInterface{    

    source = "./storage.json";
    storage_map = {
        
    };
    
    getData(field :string){
        let out = undefined;
        let obj;
        let map = this.storage_map;
        return new Promise((resolve,reject)=>{
            fs.readFile(this.source, 'utf8', function (err, data) {
                if (err) console.error(err);
                obj = JSON.parse(data);
                
                //Parse map path
                let original = map[field];
                let target = original;
                
                if (target == undefined) {
                    target = field;
                }
                else{
                    target = target.split(".");    
                }
    
                if (target.includes(".")) {
                    let current_pos = obj;
                    for (let i = 0; i < target.length; i++) {
                        const path_part = target[i];                
                        if (current_pos == undefined) {
                            resolve(current_pos);
                            break;
                        }
                        current_pos = current_pos[path_part];
                    }   
                    resolve(current_pos);
                }
                else
                    resolve(obj[target]);
            });  
        });
    }

    setData(field :string, data_ :any){ 
        let obj;   
        let src = this.source;
        let map = this.storage_map;
        return new Promise((resolve,reject)=>{
            fs.readFile(this.source, 'utf8', function (err, data) {
                if (err) console.error(err);
                obj = JSON.parse(data);
                
                let target = map[field];
                if (target == undefined) {
                    target = field;
                }
                
                if (target == "")
                    obj = data_;
                else
                {
                    eval(`obj.${target} = data_;`);   
                }
                // qwq, had to use eval
                //Rememebr to sanitize target
                
                fs.writeFile(src,JSON.stringify(obj),(err)=>{
                    console.error(err);
                });
                resolve(undefined);
            });
        });
        
    }

}


export const DefaultStorage = JsonStorage;