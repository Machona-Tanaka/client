import { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';

const PrivacySettings = () => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    dataSharing: false,
    personalizedAds: true,
    activityStatus: true,
  });

  const handleToggle = (field) => {
    setPrivacySettings(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="settings-section">
      <h2>Privacy Settings</h2>
      
      <div className="setting-item">
        <label>Profile Visibility</label>
        <select 
          value={privacySettings.profileVisibility}
          onChange={(e) => setPrivacySettings(prev => ({
            ...prev,
            profileVisibility: e.target.value
          }))}
        >
          <option value="public">Public</option>
          <option value="friends">Friends Only</option>
          <option value="private">Private</option>
        </select>
      </div>
      
      <div className="setting-item toggle-item">
        <div>
          <label>Allow data sharing for analytics</label>
          <p className="setting-description">Help us improve by sharing anonymous usage data</p>
        </div>
        <ToggleSwitch 
          checked={privacySettings.dataSharing}
          onChange={() => handleToggle('dataSharing')}
        />
      </div>
      
      <div className="setting-item toggle-item">
        <div>
          <label>Personalized advertisements</label>
          <p className="setting-description">Show ads based on your activity</p>
        </div>
        <ToggleSwitch 
          checked={privacySettings.personalizedAds}
          onChange={() => handleToggle('personalizedAds')}
        />
      </div>
      
      <div className="setting-item toggle-item">
        <div>
          <label>Show activity status</label>
          <p className="setting-description">Let others see when you're active</p>
        </div>
        <ToggleSwitch 
          checked={privacySettings.activityStatus}
          onChange={() => handleToggle('activityStatus')}
        />
      </div>
      
      <div className="settings-actions">
        <button className="btn btn-primary">Save Privacy Settings</button>
      </div>
    </div>
  );
};

export default PrivacySettings;