"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    name;
    description;
    options;
    permissions;
    permCheck;
    noPerm;
    run;
    constructor(config) {
        this.name = config.name;
        this.description = config.description;
        this.options = config.options ?? [];
        this.permissions = config.permissions ?? [];
        this.permCheck = config.permCheck;
        this.noPerm = config.noPerm;
        this.run = config.run;
    }
    ;
    toJSON() {
        return {
            name: this.name,
            description: this.description,
            options: this.options,
            run: this.run
        };
    }
    ;
}
exports.Command = Command;
;
