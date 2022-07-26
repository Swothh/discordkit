import { IEvent } from '../interfaces';
export declare class Event implements IEvent {
    name: IEvent['name'];
    type: IEvent['type'];
    run: IEvent['run'];
    constructor(config: IEvent);
}
