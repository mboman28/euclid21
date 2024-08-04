import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import DataContext from './providers';
import { Data } from './types/types';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const data: Data = require('./data/data.json');

root.render(
  <React.StrictMode>
    <DataContext.Provider value={{ data }}>
      <App />
    </DataContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
