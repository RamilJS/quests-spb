import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import App from './components/app/app';
import NotificationCard from './components/notification/notification-card';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer theme='colored'/>
      <NotificationCard/>
      <App />
    </Provider>
  </React.StrictMode>
);
