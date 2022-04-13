import React, { VFC } from 'react';
import { IEntity} from '../types';

import '../styles/sidebar.css';

import History from '../components/History';
import Form from '../components/Form';


interface IProps {
    entity: IEntity | null;
}

const Sidebar: VFC<IProps> = ({ entity }) => {

    return (
        <div className='sidebar' id="sidebar">
            <Form entity={entity}/>
            <History />
        </div>
    );
};

export default Sidebar;
