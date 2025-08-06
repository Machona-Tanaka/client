import { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';

const GeneralSettings = () => {
  const [formData, setFormData] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="settings-section">
      <h2>General Preferences</h2>
      
      <div className="setting-item">
        <label>Theme</label>
        <select 
          name="theme" 
          value={formData.theme}
          onChange={handleChange}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System Default</option>
        </select>
      </div>
      
      <div className="setting-item">
        <label>Language</label>
        <select 
          name="language" 
          value={formData.language}
          onChange={handleChange}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>
      
      <div className="setting-item">
        <label>Timezone</label>
        <select 
          name="timezone" 
          value={formData.timezone}
          onChange={handleChange}
        >
          <option value="UTC">UTC</option>
          <option value="EST">Eastern Time (EST)</option>
          <option value="PST">Pacific Time (PST)</option>
        </select>
      </div>
      
      <div className="setting-item toggle-item">
        <label>Dark Mode</label>
        <ToggleSwitch 
          checked={formData.darkMode}
          onChange={(checked) => setFormData(prev => ({ ...prev, darkMode: checked }))}
        />
      </div>
      
      <div className="settings-actions">
        <button className="btn btn-primary">Save Changes</button>
        <button className="btn btn-secondary">Cancel</button>
      </div>
    </div>
  );
};

export default GeneralSettings;