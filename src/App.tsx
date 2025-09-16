import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from './pages/Home';
import UserInfo from './pages/UserInfo';
import SpreadSelect from './pages/SpreadSelect';
import Spread from './pages/Spread';
import Result from './pages/Result';

import './App.css';

const App = () => {
  const [userInfo, setUserInfo] = useState<{name: string, concern: string} | null>(null);
  const [selectedSpread, setSelectedSpread] = useState<string | null>(null);
  const [selectedCards, setSelectedCards] = useState<any[] | null>(null);

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default App;