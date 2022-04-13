import React, { VFC } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { IEntity, IChangeNode } from '../types';
import { EEntityType } from '../enums';

import '../styles/sidebar.css';
import '../styles/button.css';
import '../styles/input.css';

import { useSelector, useDispatch } from 'react-redux';
import {
    deleteProduct,
    changeNodeRelation,
    changeGroupRelation,
    selectCluster,
    deleteGroup,
} from '../reducers/clusterSlice';

import {
    selectHistoryStack,
    selectHistoryCurrentIndex,
    addHistoryItem,
} from '../reducers/historySlice';


interface IProps {
    entity: IEntity | null;
}

const Form: VFC<IProps> = ({ entity }) => {
    const [selectedGroup, setSelectedGroup] = useState<IEntity | null>(null);
    const [selectedCluster, setSelectedCluster] = useState<IEntity | null>(null);
    const data = useSelector(selectCluster);
    const history = useSelector(selectHistoryStack);
    const historyCurrentIndex = useSelector(selectHistoryCurrentIndex);

    const dispatch = useDispatch();

    const entityCluster = entity?.type === EEntityType.Cluster
        ? entity
        : entity?.type === EEntityType.Group
            ? data.filter((cluster: IEntity) => cluster.childrens?.find((group: IEntity) => group.id === entity?.id))[0]
            : data.filter((cluster: IEntity) => {
                let groupI = cluster.childrens?.filter((group: IEntity) => group.childrens?.find((product: IEntity) => product.id === entity?.id))[0];
                return groupI ? true : false;
            })[0];

    const entityGroup: IEntity = entity?.type === EEntityType.Product
        ? entityCluster?.childrens.filter((group: IEntity) => group.childrens?.find(product => product.id === entity.id))[0]
        : entity?.type === EEntityType.Group
            ? entity
            : null;

    const entityProduct: IEntity | null = entity?.type === EEntityType.Product ? entity : null;

    const isControlVisible = entity ? true : false;
    const isIdVisible = false;
    const isProductVisible = entity?.type === EEntityType.Product;
    const isGroupVisible = entity?.type === EEntityType.Group || isProductVisible;
    const isClusterVisible = entity?.type === EEntityType.Cluster || isGroupVisible;
    const isHistoryVisible = history.length ? true : false;


    const handleGroupChange = (e: any) => {
        let id: string = e.target[e.target.selectedIndex].dataset.id;
        setSelectedGroup(() =>
            data.filter((cluster: IEntity) => cluster.id === selectedCluster?.id)[0]
                ?.childrens.filter((group: IEntity) => group.id == id)[0]
        );
    }


    const handleClasterChange = (e: any) => {
        let id: string = e.target[e.target.selectedIndex].dataset.id;
        let cluster: IEntity = data.filter((cluster: IEntity) => cluster.id === id)[0];

        setSelectedCluster(cluster);
        cluster.id !== entityCluster.id ? setSelectedGroup(cluster.childrens?.[0] || null) : setSelectedGroup(entityGroup);
    }

    const createNodeInformation = () => {
        let nodeInformation: IChangeNode = {
            cluster: { id: entityCluster.id, newId: isGroupVisible ? selectedCluster?.id : null },
            group: !isProductVisible ? entityGroup : { id: entityGroup?.id, newId: selectedGroup?.id },
            product: isProductVisible ? entityProduct : null
        };

        return nodeInformation;
    }

    const handleBtnDelete = () => {
        let nodeInformation = createNodeInformation();
        if (isProductVisible) {
            dispatch(addHistoryItem(data));
            dispatch(deleteProduct(nodeInformation));
            return;
        }
        if (isGroupVisible) {
            dispatch(addHistoryItem(data));
            dispatch(deleteGroup(nodeInformation));
            return;
        }
    }

    const handleBtnChange = () => {
        let nodeInformation = createNodeInformation();
        console.log(nodeInformation);
        if (isProductVisible) {
            dispatch(addHistoryItem(data));
            dispatch(changeNodeRelation(nodeInformation));
            return;
        }
        if (isGroupVisible) {
            dispatch(addHistoryItem(data));
            dispatch(changeGroupRelation(nodeInformation));
            return;
        }

    }


    useEffect(() => {
        setSelectedGroup(entityGroup);
        setSelectedCluster(entityCluster);
    }, [entity]);



    return (
            <div className="sidebar__form">
                {isIdVisible && (
                    <label>
                        id:
                        <input type="text" disabled value={entityProduct?.id} />
                    </label>
                )}

                {isProductVisible && (
                    <label>
                        Продукт:
                        <input type="text" value={entityProduct?.name} />
                    </label>
                )}

                {isGroupVisible && !isProductVisible && (
                    <label>
                        Группа:
                        <input type="text" value={entityGroup?.name} />
                    </label>
                )}

                {isGroupVisible && isProductVisible && (
                    <label>
                        Группа:
                        <select value={selectedGroup?.name} onChange={handleGroupChange}>
                            {
                                selectedCluster?.childrens?.map((group: IEntity) => (
                                    <option value={group.name} key={group.id} data-id={group.id}>{group.name}</option>
                                ))
                            }
                        </select>
                    </label>
                )}

                {isClusterVisible && isGroupVisible && (
                    <label>
                        Кластер:
                        <select value={selectedCluster?.name} onChange={handleClasterChange}>
                            {
                                data.map((cluster: IEntity) => (
                                    <option value={cluster.name} key={cluster.id} data-id={cluster.id}>{cluster.name}</option>
                                ))
                            }
                        </select>
                    </label>
                )}


                {isClusterVisible && !isGroupVisible && (
                    <label>
                        Кластер:
                        <input type="text" disabled value={entityCluster?.name} />
                    </label>
                )}

                {
                    isControlVisible && (
                        <React.Fragment>
                            <button onClick={handleBtnDelete}>Удалить свзяь</button>
                            <button onClick={handleBtnChange}>Изменить свзяь</button>
                        </React.Fragment>
                    )
                }

            </div>
    );
};

export default Form;
