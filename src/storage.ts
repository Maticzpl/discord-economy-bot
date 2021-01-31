import * as fs from "fs";


export interface StorageInterface{

    getData(target :string           )   :Promise<any>;
    setData(target :string,data :any )   :Promise<any>;    
    
    readonly source: string;
    readonly storage_map: object;
}

// JSON STORAGE
class JsonStorage implements StorageInterface{    

    source = "./storage.json";
    storage_map = {
        
    };
    
    getData(target :string){ 

        let obj : {[index: string]:string};   
        let src = this.source! as string;
        let map = this.storage_map! as {[index:string]:any};

        return new Promise((resolve,reject)=>{
            fs.readFile(this.source, 'utf8', function (err, data) {
                if (err) console.error(err);
                obj = JSON.parse(data);
                
                let path;
                if (map[target])                     
                    path = map[target].split('.') as string[];
                else
                    path = target.split('.') as string[];
                  
                let previous : any;
                path.forEach(part=>{
                    if (!previous)
                        previous = obj[part];
                    else
                        previous = previous[part];                    
                });
                
                resolve(previous);
            });  
        });
    }

    setData(target :string, data_ :any){ 
        let obj : {[index: string]:string};   
        let src = this.source! as string;
        let map = this.storage_map! as {[index:string]:any};
        return new Promise((resolve,reject)=>{
            fs.readFile(this.source, 'utf8', function (err, data) {
                if (err) console.error(err);
                obj = JSON.parse(data);
                
                let path;
                if (map[target])                     
                    path = map[target].split('.');
                else
                    path = target.split('.');
                         
                path.reduce((a, b, i, arr) => (i == arr.length-1) ? a[b] = data_ : (a[b] ?? (a[b] = {})), obj)

                let stringify = JSON.stringify(obj);
                fs.writeFile(src,stringify,(err)=>{
                    if(err) 
                        console.error(err);
                    else 
                        resolve("success");
                });

                
                resolve("an error occured")
            });
        });
        
    }

}


export const DefaultStorage = JsonStorage;