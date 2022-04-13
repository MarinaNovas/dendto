import { EEntityType } from './enums';

export interface IEntity {
    id: string;
    type: EEntityType;
    name: string;
    childrens?: IEntity[];
}

export interface INodeInf {
    id: string | null;
    newId?: string | null;
}

export interface IChangeNode {
    [EEntityType.Cluster]: INodeInf,
    [EEntityType.Group]: INodeInf | IEntity,
    [EEntityType.Product]: IEntity| null
}
