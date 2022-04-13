import '../styles/sidebar.css';
import '../styles/history.css';

import { useSelector, useDispatch } from 'react-redux';
import {
    selectCluster,
    updateCluster
} from '../reducers/clusterSlice';

import {
    selectHistoryStack,
    selectHistoryCurrentIndex,
    addHistoryItem,
    setCurrentIndex,
} from '../reducers/historySlice';


const History = () => {
    const data = useSelector(selectCluster);
    const history = useSelector(selectHistoryStack);
    const historyCurrentIndex = useSelector(selectHistoryCurrentIndex);


    const dispatch = useDispatch();

    const handleHistoryClick = (e: any) => {
        let index = e.target.id;
        if (historyCurrentIndex === -1) dispatch(addHistoryItem(data));
        dispatch(updateCluster(history[index]));
        dispatch(setCurrentIndex(parseInt(e.target.id)));
    }



    return (
        <div className='sidebar__history'>
            <h1>History</h1>
            <ul className='history'>
                {
                    history.map((item: [], index: any) => (
                        <li
                            className={`history__item ${index === historyCurrentIndex ? 'history__item--active' : ''} ${historyCurrentIndex !== -1 && index === history.length - 1 ? 'history__item-current' : ''}`}
                            id={index}
                            key={index}
                            onClick={handleHistoryClick}
                        >
                            {historyCurrentIndex !== -1 && index == history.length - 1 ? 'Current state' : `Snapshot #${index}`}
                        </li>
                    )


                    )
                }
            </ul>
        </div>
    );
};

export default History;
