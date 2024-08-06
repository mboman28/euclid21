import './index.css'; 
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { pdfjs } from 'react-pdf';
import {
  HashRouter,
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
    <HashRouter>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </HashRouter>
    </DataContext.Provider>
  </React.StrictMode>
);
