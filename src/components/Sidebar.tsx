import { VFC } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { IEntity } from '../types';
import {INodeInf} from '../types';
import '../styles/sidebar.css';
import '../styles/button.css'
import { EActionType } from '../enums';

import { useSelector, useDispatch} from 'react-redux';
import {
    deleteProduct,
    //addProduct,
    changeNodeRelation, 
    selectCluster
} from '../reducers/clusterSlice';

/* interface IProps {
    entity: IEntity | null;
} */

interface IProps {
    entity:INodeInf|null;
}


const Sidebar: VFC<IProps> = ({entity}) => {
    const {cluster, group, product} =entity||{};
    //console.log(entity);
   /*  const cluster = entity?.cluster;
    const group = entity?.group;
    const product = entity?.product; */

    const [action, setAction] = useState('delete');
    const [selectGroup, setSelectGroup] = useState(entity?.group);
    const data = useSelector(selectCluster);
    const dispatch = useDispatch();

    /* const isControlVisible = entity?true:false;
    const isIdVisible = false;
    const isProductVisible = entity?.type === EEntityType.Product;
    const isGroupVisible = entity?.type === EEntityType.Group || isProductVisible;
    const isClusterVisible = entity?.type === EEntityType.Cluster || isGroupVisible; */

    const isControlVisible = product?true:false;
    const isIdVisible = false;
    const isProductVisible = product?true:false;
    const isGroupVisible = group?true:false;
    const isClusterVisible = cluster?true:false;

    const handleActionChange = (e: any) => {
        setAction(e.target.value);
    }

    const handleGroupChange = (e: any) => {
        setSelectGroup(e.target.value);
    }

    const handleBtnApply=()=>{
        action===EActionType.Delete
            ?dispatch(deleteProduct(entity))
                :dispatch(changeNodeRelation({
                cluster:{id:"2131231"},
                group:{id:"32335",newId:"32333"},
                product:{
                  "id": "11113",
                  "type": "product",
                  "name": "продукт2",
                  "isLinkedWithGroup": true,
                  "isLinkedWithCluster": true
                }}));
    }

    useEffect(()=>{
        setSelectGroup(entity?.group);
    },[entity]);
    console.log(selectGroup);

    return (
        <div id="sidebar">
            {isControlVisible &&(
                <select value={action} onChange={handleActionChange}>
                    <option value={EActionType.Delete}>Удалить связь</option>
                    <option value={EActionType.Change}>Изменить связь</option>
                </select>
                )
            }

            {isIdVisible && (
                <label>
                    id:
                    <input type="text" disabled value={product?.id} />
                </label>
            )}

            {isProductVisible && (
                <label>
                    Продукт:
                    <input type="text" value={product?.name} />
                </label>
            )}

            {isGroupVisible && (
                <label>
                    Группа:
                    {/* <input type="text" disabled value={entity.name} /> */}
                    <select value={selectGroup?.name} onChange={handleGroupChange}>
                        {
                            data[0].childrens.map((item: IEntity) => (
                                <option value={item.name} key={item.id} data-group={item}>{item.name}</option>
                            ))
                        }
                    </select>
                </label>
            )}

            {isClusterVisible && (
                <label>
                    Кластер:
                    <input type="text" disabled value={cluster?.name} />
                </label>
            )}

            {
                isControlVisible && (
                    <button onClick={handleBtnApply}>Применить</button>
                )
            }
        </div>
    );
};

export default Sidebar;
