import React, { useState } from 'react';
import { Incident } from '../types/incident';

interface IncidentItemProps {
  incident: Incident;
}

const IncidentItem: React.FC<IncidentItemProps> = ({ incident }) => {
  const [expanded, setExpanded] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'Low':
        return 'severity-low';
      case 'Medium':
        return 'severity-medium';
      case 'High':
        return 'severity-high';
      default:
        return '';
    }
  };

  return (
    <div className="incident-item">
      <div className="incident-header">
        <div>
          <h3 className="incident-title">{incident.title}</h3>
          <div className="incident-meta">
            <span className={`incident-severity ${getSeverityClass(incident.severity)}`}>
              {incident.severity}
            </span>
            <span className="incident-date">
              {formatDate(incident.reported_at)}
            </span>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="btn btn-primary mt-2 sm:mt-0"
        >
          {expanded ? 'Hide Details' : 'View Details'}
        </button>
      </div>
      
      {expanded && (
        <div className="incident-details">
          <p className="incident-description">{incident.description}</p>
          <div className="incident-id">
            <span className="font-medium">Incident ID:</span> {incident.id}
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentItem;