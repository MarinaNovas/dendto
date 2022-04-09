import {useState, VFC} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

import rootReducer from '../reducers';
import {IEntity} from '../types';

import Dendrogram from '../components/Dendrogram';
import Sidebar from '../components/Sidebar';

import '../styles/reset.css';
import '../styles/app.css';
import '../styles/link.css';

const store = configureStore({
    reducer: rootReducer,
});

const Main: VFC = () => {
    const [currentEntity, setCurrentEntity] = useState<IEntity | null>(null);

    const handleEntitySelect = (entity: IEntity) => setCurrentEntity(entity);

    return (
        <Provider store={store}>
            <div id="main">
                <Dendrogram onSelectEntity={handleEntitySelect} />

                <div id="sidebar-container">
                    <Sidebar entity={currentEntity} />
                </div>
            </div>
        </Provider>
    );
};

const root = createRoot(document.getElementById('app') as Element);
root.render(<Main />);
