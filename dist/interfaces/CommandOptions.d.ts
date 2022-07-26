import { OptionType } from '../enums';
export interface ICommandOptions {
    type: OptionType;
    name: string;
    description: string;
    required?: boolean;
    options?: ICommandOptions[];
    choices?: {
        name: string;
        value: any;
    }[];
}
