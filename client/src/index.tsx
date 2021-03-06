import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PlanView from './components/PlanView';
import reportWebVitals from './reportWebVitals';
import {GetGlobalizeWrapperInstance} from './globalization/GlobalizeWrapper';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const TITLE = GetGlobalizeWrapperInstance().getMessage("appTitle");

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>{ TITLE }</title>
      </Helmet>
      <PlanView />
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
