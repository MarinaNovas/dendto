import {VFC} from 'react';
import {IEntity} from '../types';
import '../styles/sidebar.css';
import {EEntityType} from '../enums';

interface IProps {
    entity: IEntity | null;
}

const Sidebar: VFC<IProps> = ({entity}) => {
    const isIdVisible = false;
    const isProductVisible = entity?.type === EEntityType.Product;
    const isGroupVisible = entity?.type === EEntityType.Group || isProductVisible;
    const isClusterVisible = entity?.type === EEntityType.Cluster || isGroupVisible;

    return (
        <div id="sidebar">
            {isIdVisible && (
                <label>
                    id:
                    <input type="text" disabled value={entity?.id} />
                </label>
            )}

            {isProductVisible && (
                <label>
                    Продукт:
                    <input type="text" value={entity.name} />
                </label>
            )}

            {isGroupVisible && (
                <label>
                    Группа:
                    <input type="text" disabled value={entity.name} />
                </label>
            )}

            {isClusterVisible && (
                <label>
                    Кластер:
                    <input type="text" disabled value={entity.name} />
                </label>
            )}
        </div>
    );
};

export default Sidebar;
