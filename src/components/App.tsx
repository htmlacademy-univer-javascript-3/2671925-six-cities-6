import React from 'react';
import MainPage from './main-page';

interface AppProps {
  offersCount: number;
}

const App: React.FC<AppProps> = ({ offersCount }) => <MainPage offersCount={offersCount} />;

export default App;
