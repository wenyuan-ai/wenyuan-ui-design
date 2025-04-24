import React from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';

import React from 'react';
import Auth from './components/Auth';

const App = () => {
  return (
    <div className="app">
      <Auth />
    </div>
  );
  return (
    <div className="app">
      <div className="tech-orb tech-orb-1"></div>
      <div className="tech-orb tech-orb-2"></div>
      <Sidebar />
      <Chat />
    </div>
  );
};

export default App;
