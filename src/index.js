import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BudgetProvider from './context/BudgetProvider';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BudgetProvider>
    <App />
    </BudgetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);



