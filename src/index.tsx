import './index.css'; 
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { pdfjs } from 'react-pdf';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import DataContext from './providers';
import { Data } from './types/types';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const data: Data = require('./data/data.json');

root.render(
  <React.StrictMode>
    <DataContext.Provider value={{ data }}>
    <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
