/* Styles for OtherUpdates.jsx */
import React from 'react';

const OtherUpdates = ({ updates }) => {
  return (
    <div className="other-updates">
      <h2 className="section-title">Other Updates</h2>
      <div className="updates-grid">
        {updates.map((update) => (
          <div key={update.id} className={`update-card ${update.type}`}>
            <div className="update-content">
              <h3>{update.title}</h3>
              <span className="update-date">{update.date}</span>
              <button className="update-button">
                {update.type === 'collection' && 'View Collection'}
                {update.type === 'sale' && 'Shop Sale'}
                {update.type === 'guide' && 'Read Guide'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherUpdates;