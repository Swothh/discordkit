import EventEmitter from 'events';
export declare interface FileLoader<T> {
    on(event: 'error', listener: (err: Error) => Promise<any> | any): this;
    on(event: 'finish', listener: (time: number) => Promise<any> | any): this;
    on(event: 'load', listener: (file: T) => Promise<any> | any): this;
}
export declare class FileLoader<T> extends EventEmitter {
    files: Array<T>;
    startedAt: number;
    constructor(dir: string);
}
