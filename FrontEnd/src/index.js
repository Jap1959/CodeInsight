import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Navigation from './App';
import { ThemeProvider } from '@emotion/react';
import theme from './Theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Navigation  />
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();
