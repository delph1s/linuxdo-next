import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@assets/scss/index.scss';
import styles from '@assets/scss/vars.module.scss';

const appendLinuxDoNext = () => {
  const app = document.createElement('div');
  app.setAttribute('id', styles.pluginContainer);
  document.body.append(app);
  return app;
};

ReactDOM.createRoot(appendLinuxDoNext()).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
