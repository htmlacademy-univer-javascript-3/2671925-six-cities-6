import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const rentalData = {
  offersCount: 999,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersCount={rentalData.offersCount} />
  </React.StrictMode>
);
