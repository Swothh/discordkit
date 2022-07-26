"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    name;
    type;
    run;
    constructor(config) {
        this.name = config.name;
        this.type = config.type;
        this.run = config.run;
    }
    ;
}
exports.Event = Event;
;
