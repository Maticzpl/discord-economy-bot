"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultStorage = void 0;
const fs = require("fs");
// JSON STORAGE
class JsonStorage {
    constructor() {
        this.source = "../storage.json";
        this.storage_map = {};
    }
    getData(target) {
        let obj;
        let src = this.source;
        let map = this.storage_map;
        return new Promise((resolve, reject) => {
            fs.readFile(this.source, 'utf8', function (err, data) {
                if (err)
                    console.error(err);
                obj = JSON.parse(data);
                let path;
                if (map[target])
                    path = map[target].split('.');
                else
                    path = target.split('.');
                let previous;
                path.forEach(part => {
                    if (!previous)
                        previous = obj[part];
                    else
                        previous = previous[part];
                });
                resolve(previous);
            });
        });
    }
    setData(target, data_) {
        let obj;
        let src = this.source;
        let map = this.storage_map;
        return new Promise((resolve, reject) => {
            fs.readFile(this.source, 'utf8', function (err, data) {
                if (err)
                    console.error(err);
                obj = JSON.parse(data);
                let path;
                if (map[target])
                    path = map[target].split('.');
                else
                    path = target.split('.');
                path.reduce((a, b, i, arr) => (i == arr.length - 1) ? a[b] = data_ : (a[b] ?? (a[b] = {})), obj);
                let stringify = JSON.stringify(obj);
                fs.writeFile(src, stringify, (err) => {
                    if (err)
                        console.error(err);
                    else
                        resolve("success");
                });
                resolve("an error occured");
            });
        });
    }
}
exports.DefaultStorage = JsonStorage; //btw all storages classes behave like they are "Static" cause we have just one file to write and read from :P
