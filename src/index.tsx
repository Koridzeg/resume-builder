import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@mui/material';
import  appTheme  from './themes/theme';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>
);
