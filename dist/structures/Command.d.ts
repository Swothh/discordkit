import { ICommand } from '../interfaces';
export declare class Command implements ICommand {
    name: ICommand['name'];
    description: ICommand['description'];
    options?: ICommand['options'];
    permissions?: ICommand['permissions'];
    permCheck?: ICommand['permCheck'];
    noPerm?: ICommand['noPerm'];
    run: ICommand['run'];
    constructor(config: ICommand);
    toJSON(): ICommand;
}
