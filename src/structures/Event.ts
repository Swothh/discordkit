import { IEvent } from '../interfaces';

export class Event implements IEvent {
    public name: IEvent['name'];
    public type: IEvent['type'];
    public run: IEvent['run'];

    constructor(config: IEvent) {
        this.name = config.name;
        this.type = config.type;
        this.run = config.run;
    };
};