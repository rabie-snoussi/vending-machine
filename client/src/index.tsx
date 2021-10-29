import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'shared/locale/LocaleContext';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
