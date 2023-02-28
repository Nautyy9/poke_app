import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App';
import React from 'react';
import ContextWrapper from '../context/TanstackContext'
import { Provider } from 'react-redux';
import store from '../redux/app/store'
import { QueryClient,  QueryClientProvider } from 'react-query';
import { ReactQueryDevtools} from 'react-query/devtools';

const client = new QueryClient()

import {BrowserRouter as Router } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Router>
        <Provider store={store}>
            <QueryClientProvider client={client}>
            <ContextWrapper>
                <App/>
            </ContextWrapper>
            <ReactQueryDevtools/>
            </QueryClientProvider>
        </Provider>
        </Router>
    </React.StrictMode>
)

