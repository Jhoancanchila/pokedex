import React from 'react';
import './StatBar.css';

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
}

const StatBar: React.FC<StatBarProps> = ({ 
  label, 
  value, 
  maxValue = 150, 
  color = '#8BC34A' 
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  
  return (
    <div className="stat-bar">
      <div className="stat-info">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value.toString().padStart(3, '0')}</span>
      </div>
      <div className="stat-progress">
        <div 
          className="stat-fill"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
};

export default StatBar;
