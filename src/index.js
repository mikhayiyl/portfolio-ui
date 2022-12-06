import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import './styles/styles.scss';
import App from './App';
import { Provider } from "react-redux";
import Store from './store/configureStore';
import { AppContextProvider } from './components/context/AppContext/AppContext';
const store = Store();


ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
                <AppContextProvider >
                    <App />
                </AppContextProvider>
            </Provider>
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
);
