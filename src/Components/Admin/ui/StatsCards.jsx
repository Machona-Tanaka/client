import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import './styles/StateCard.css'; // Assuming you have a CSS file for styling
import { NavLink } from 'react-router-dom';


const StatsCard = ({ title, value, icon, color, trend, url_Link }) => {

  // Define icon mappings
  const iconMap = {
    article: 'mdi:newspaper-variant-outline',
    podcast: 'mdi:microphone-outline',
    guide: 'mdi:book-open-outline',
    product: 'mdi:tshirt-crew-outline',
    user: 'mdi:account-outline',
    comment: 'mdi:comment-text-outline',
    view: 'mdi:eye-outline',
    download: 'mdi:download-outline',
    // Add more icons as needed
  };

  // Determine trend indicator
  const getTrendIndicator = () => {
    if (!trend) return null;
    
    if (trend > 0) {
      return (
        <span className="trend positive">
          <Icon icon="mdi:trending-up" /> {trend}%
        </span>
      );
    } else if (trend < 0) {
      return (
        <span className="trend negative">
          <Icon icon="mdi:trending-down" /> {Math.abs(trend)}%
        </span>
      );
    } else {
      return (
        <span className="trend neutral">
          <Icon icon="mdi:trending-neutral" /> 0%
        </span>
      );
    }
  };

  return (
    <div className={`stats-card ${color || ''}`}>
      <div className="stats-icon">
        <Icon icon={iconMap[icon] || 'mdi:chart-box-outline'} />
      </div>
      <div className="stats-content">
        <h3>{title}</h3>
        <div className="stats-value">
          {value}
          {getTrendIndicator()}
        </div>
        <NavLink className="btn view-all" to={`/admin/${url_Link || '#'}`}>
          View All
        </NavLink>
      </div>
    </div>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
  trend: PropTypes.number,
};

export default StatsCard;