"use strict";
exports.__esModule = true;
exports.JsonStorage = void 0;
var fs = require("fs");
// JSON STORAGE
var JsonStorage = /** @class */ (function () {
    function JsonStorage() {
        this.source = "./storage.json";
        this.storage_map = {
            test: "test",
            best: "best"
        };
    }
    JsonStorage.prototype.getData = function (field) {
        var _this = this;
        var out = undefined;
        var obj;
        var map = this.storage_map;
        return new Promise(function (resolve, reject) {
            fs.readFile(_this.source, 'utf8', function (err, data) {
                if (err)
                    console.error(err);
                obj = JSON.parse(data);
                //Parse map path
                var target = map[field].split(".");
                var current_pos = obj;
                for (var i = 0; i < target.length; i++) {
                    var path_part = target[i];
                    current_pos = current_pos[path_part];
                }
                resolve(current_pos);
            });
        });
    };
    JsonStorage.prototype.setData = function (field, data_) {
        var _this = this;
        var obj;
        var src = this.source;
        return new Promise(function (resolve, reject) {
            fs.readFile(_this.source, 'utf8', function (err, data) {
                if (err)
                    console.error(err);
                obj = JSON.parse(data);
                if (field == "")
                    obj = data_;
                else
                    eval("obj." + field + " = data_;");
                // qwq, had to use eval
                //Rememebr to sanitize field
                fs.writeFile(src, JSON.stringify(obj), function (err) {
                    console.error(err);
                });
                resolve(undefined);
            });
        });
    };
    return JsonStorage;
}());
exports.JsonStorage = JsonStorage;
