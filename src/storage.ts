import * as fs from "fs";
import { resolve } from "path";
import { createModuleResolutionCache } from "typescript";


export interface StorageInterface{

    getData(field :string           )   :Promise<any>;
    setData(field :string,data :any )   :Promise<any>;    
    
    readonly source: string;
    readonly storage_map: object;
}


// JSON STORAGE
export class JsonStorage implements StorageInterface{    

    source = "./storage.json";
    storage_map = {
        test:"test",
        best:"best",
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
                
                let target = map[field].split(".");
    
                let current_pos = obj;
                for (let i = 0; i < target.length; i++) {
                    const path_part = target[i];                
                
                    current_pos = current_pos[path_part];
                }
    
                
                resolve(current_pos);
            });  
        });
    }

    setData(field :string, data_ :any){ 
        let obj;   
        let src = this.source;
        return new Promise((resolve,reject)=>{
            fs.readFile(this.source, 'utf8', function (err, data) {
                if (err) console.error(err);
                obj = JSON.parse(data);
                
                if (field == "")
                    obj = data_;
                else
                    eval(`obj.${field} = data_;`);   
                // qwq, had to use eval
                //Rememebr to sanitize field
                
                fs.writeFile(src,JSON.stringify(obj),(err)=>{
                    console.error(err);
                });
                resolve(undefined);
            });
        });
        
    }

}
