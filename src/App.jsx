import React from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <Chat />
    </div>
  );
};

export default App;
