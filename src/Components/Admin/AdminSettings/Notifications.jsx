import { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';;

const Notifications = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    newsletter: true,
    productUpdates: true,
  });

  const handleToggle = (field) => {
    setNotificationSettings(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="settings-section">
      <h2>Notification Preferences</h2>
      
      <h3>Notification Channels</h3>
      
      <div className="setting-item toggle-item">
        <div>
          <label>Email Notifications</label>
          <p className="setting-description">Receive important updates via email</p>
        </div>
        <ToggleSwitch 
          checked={notificationSettings.emailNotifications}
          onChange={() => handleToggle('emailNotifications')}
        />
      </div>
      
      <div className="setting-item toggle-item">
        <div>
          <label>Push Notifications</label>
          <p className="setting-description">Get alerts on your device</p>
        </div>
        <ToggleSwitch 
          checked={notificationSettings.pushNotifications}
          onChange={() => handleToggle('pushNotifications')}
        />
      </div>
      
      <div className="setting-item toggle-item">
        <div>
          <label>SMS Notifications</label>
          <p className="setting-description">Receive text messages (standard rates may apply)</p>
        </div>
        <ToggleSwitch 
          checked={notificationSettings.smsNotifications}
          onChange={() => handleToggle('smsNotifications')}
        />
      </div>
      
      <h3>Notification Types</h3>
      
      <div className="setting-item toggle-item">
        <div>
          <label>Newsletter</label>
          <p className="setting-description">Weekly digest and announcements</p>
        </div>
        <ToggleSwitch 
          checked={notificationSettings.newsletter}
          onChange={() => handleToggle('newsletter')}
        />
      </div>
      
      <div className="setting-item toggle-item">
        <div>
          <label>Product Updates</label>
          <p className="setting-description">New features and improvements</p>
        </div>
        <ToggleSwitch 
          checked={notificationSettings.productUpdates}
          onChange={() => handleToggle('productUpdates')}
        />
      </div>
      
      <div className="settings-actions">
        <button className="btn btn-primary">Save Notification Settings</button>
      </div>
    </div>
  );
};

export default Notifications;