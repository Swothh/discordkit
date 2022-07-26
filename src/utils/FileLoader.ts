import { Command, Event } from '../structures';
import EventEmitter from 'events';
import { join } from 'path';
import glob from 'glob';

export declare interface FileLoader<T> {
    on(event: 'error', listener: (err: Error) => Promise<any> | any): this;
    on(event: 'finish', listener: (time: number) => Promise<any> | any): this;
    on(event: 'load', listener: (file: T) => Promise<any> | any): this;
};

export class FileLoader<T> extends EventEmitter {
    public files: Array<T> = [];
    public startedAt: number = Date.now();

    constructor(dir: string) {
        super();
        glob('**/*+(.ts|.js)', { cwd: dir }, (err, files: string[]) => {
            if (err) return this.emit('error', err);
            files.forEach(async (file, index) => {
                const { default: File }: { default: T } = await import(join(dir, file));
                const isFirst = this.files.length === 0 && (File instanceof Command || File instanceof Event);
                let instance: typeof Command | typeof Event = Command;

                if (isFirst || File instanceof instance) {
                    instance = File instanceof Command ? Command : Event;
                    this.files.push(File);
                    this.emit('load', File);
                } else {
                    if (!(File instanceof Command) && !(File instanceof Event)) {
                        this.emit('error', new Error(`${file} must export a Command instance or Event instance as default.`));
                    };
                };
                if (index === files.length - 1) this.emit('finish', Date.now() - this.startedAt);
            });
        });
    };
};