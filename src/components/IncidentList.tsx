import React from 'react';
import { Incident, SeverityFilter } from '../types/incident';
import IncidentItem from './IncidentItem';

interface IncidentListProps {
  incidents: Incident[];
  currentFilter: SeverityFilter;
}

const IncidentList: React.FC<IncidentListProps> = ({ incidents, currentFilter }) => {
  if (incidents.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">
          {currentFilter === 'All' 
            ? 'No incidents found in the system.' 
            : `No ${currentFilter.toLowerCase()} severity incidents found.`}
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Try changing your filter criteria or report a new incident.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {incidents.map((incident) => (
        <IncidentItem key={incident.id} incident={incident} />
      ))}
      <div className="mt-4 text-center text-sm text-gray-500">
        Showing {incidents.length} incident{incidents.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default IncidentList;