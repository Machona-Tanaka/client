import { useState } from 'react';
import SettingsNav from './SettingsNav';
import GeneralSettings from './GeneralSettings';
import AccountSettings from './AccountSettings';
import PrivacySettings from './PrivacySettings';
import Notifications from './Notifications';
import './css/Settings.css'

const SettingsLayout = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  const renderTab = () => {
    switch(activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'account':
        return <AccountSettings />;
      case 'privacy':
        return <PrivacySettings />;
      case 'notifications':
        return <Notifications />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="dashboard-container">
      <SettingsNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Manage your account preferences and settings</p>
        </div>
        
        <div className="settings-content">
          {renderTab()}
        </div>
      </main>
    </div>
  );
};

export default SettingsLayout;