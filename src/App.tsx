import { useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import UserInfo from './pages/UserInfo';
import SpreadSelect from './pages/SpreadSelect';
import Spread from './pages/Spread';
import Result from './pages/Result';
import Loading from './pages/Loading';
import type { SpreadCardData } from './utils/mockCards';

import './App.css';

const AppContent = () => {
  const [userInfo, setUserInfo] = useState<{name: string, concern: string} | null>(null);
  const [selectedSpread, setSelectedSpread] = useState<string | null>(null);
  const [selectedCards, setSelectedCards] = useState<SpreadCardData[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [previousPath, setPreviousPath] = useState('');

  const location = useLocation();

  useEffect(() => {
    if (previousPath !== '' && previousPath !== location.pathname) {
      let loadingDuration = 0;
      let message = '';

      switch(location.pathname) {
        case '/spread-select':
          message = '듀아아아아~';
          loadingDuration = 3000;
          break;
        case '/spread':
          message = `카드를 준비중이다요...`;
          loadingDuration = 3000;
          break;
        case '/result':
          message = '아디나를 기다려 달라요...';
          loadingDuration = 3000;
          break;
        default:
          loadingDuration = 0;
      }

      if (loadingDuration > 0) {
        setLoadingMessage(message);
        setIsLoading(true);

        const timer = setTimeout(() => {
          setIsLoading(false);
        }, loadingDuration);

        return () => clearTimeout(timer);
      }
    }

    setPreviousPath(location.pathname);
  }, [location.pathname, selectedSpread, previousPath]);

  if (isLoading) {
    return <Loading message={loadingMessage} onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="app-container">
      <div className="app-background">
        <div className="sparkle-background"></div>
      </div>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-info" element={<UserInfo onSubmit={setUserInfo} />}/>
          <Route path="/spread-select" element={userInfo ?
            <SpreadSelect onSelect={setSelectedSpread} /> :
            <Navigate to="/" replace />
          }/>
          <Route path="/spread" element={userInfo && selectedSpread ?
            <Spread spreadType={selectedSpread} userInfo={userInfo} onComplete={setSelectedCards} /> :
            <Navigate to="/" replace />
          }/>
          <Route path="/result" element={selectedCards ?
            <Result userInfo={userInfo} spreadType={selectedSpread} selectedCards={selectedCards}/> :
            <Navigate to="/" replace />
          }/>
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;

