import {EEntityType} from './enums';

export interface IEntity {
    id: string;
    type: EEntityType;
    name: string;
    childrens?: IEntity[];
}
