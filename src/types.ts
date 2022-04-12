import {EEntityType} from './enums';

export interface IEntity {
    id: string;
    type: EEntityType;
    name: string;
    childrens?: IEntity[];
}

export interface INodeInf{
    [EEntityType.Cluster]:IEntity|null,
    [EEntityType.Group]:IEntity|null,
    [EEntityType.Product]:IEntity|null

    /* cluster:IEntity|null,
    group:IEntity|null,
    product:IEntity|null */
}
