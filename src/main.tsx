import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App';
import React from 'react';
import ContextWrapper from '../context/TanstackContext'
import { Provider } from 'react-redux';
import store from '../redux/app/store'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ContextWrapper>
                <App/>
            </ContextWrapper>
        </Provider>
    </React.StrictMode>
)

