import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Provider as AlertProvider, transitions, positions } from 'react-alert';

import AlertTemplate from 'react-alert-template-basic';

export const baseUrl = "https://vistagramserver.onrender.com"
// export const baseUrl = "http://localhost:5000"

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);

