import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Chat from '../Chat';
import TrainingPanel from '../TrainingPanel';
import './styles.css';

const MainApp = ({ user, onLogout }) => {
  const [showTrainingPanel, setShowTrainingPanel] = useState(false);
  
  const toggleTrainingPanel = () => {
    setShowTrainingPanel(!showTrainingPanel);
  };

  return (
    <div className="main-app">
      <Sidebar 
        user={user} 
        onLogout={onLogout}
        onOpenTraining={toggleTrainingPanel}
      />
      
      <main className="content-area">
        <Chat />
      </main>
      
      <TrainingPanel 
        isVisible={showTrainingPanel} 
        onClose={() => setShowTrainingPanel(false)}
      />
    </div>
  );
};

export default MainApp;
