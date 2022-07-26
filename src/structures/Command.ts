import { ICommand } from '../interfaces';

export class Command implements ICommand {
    public name: ICommand['name'];
    public description: ICommand['description'];
    public options?: ICommand['options'];
    public permissions?: ICommand['permissions'];
    public permCheck?: ICommand['permCheck'];
    public noPerm?: ICommand['noPerm'];
    public run: ICommand['run'];

    constructor(config: ICommand) {
        this.name = config.name;
        this.description = config.description;
        this.options = config.options ?? [];
        this.permissions = config.permissions ?? [];
        this.permCheck = config.permCheck;
        this.noPerm = config.noPerm;
        this.run = config.run;
    };

    public toJSON(): ICommand {
        return {
            name: this.name,
            description: this.description,
            options: this.options,
            run: this.run
        };
    };
};