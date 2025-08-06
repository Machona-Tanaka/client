const SettingsNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'general', icon: '⚙️', label: 'General' },
    { id: 'account', icon: '👤', label: 'Account' },
    { id: 'privacy', icon: '🔒', label: 'Privacy' },
    { id: 'notifications', icon: '🔔', label: 'Notifications' },
  ];

  return (
    <nav className="settings-nav">
      <div className="nav-header">
        <h3>Settings</h3>
      </div>
      
      <ul className="nav-tabs">
        {tabs.map(tab => (
          <li 
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SettingsNav;