import React, { useState, useEffect } from 'react';
import { Incident, SeverityFilter, SortOrder } from './types/incident';
import { mockIncidents } from './data/mockData';
import FilterControls from './components/FilterControls';
import IncidentList from './components/IncidentList';
import IncidentForm from './components/IncidentForm';

function App() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('All');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [isLoading, setIsLoading] = useState(true);
  
  // Load initial data with simulated loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIncidents(mockIncidents);
      setIsLoading(false);
    }, 700);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter incidents based on severity
  const filteredIncidents = severityFilter === 'All'
    ? incidents
    : incidents.filter(incident => incident.severity === severityFilter);
  
  // Sort incidents based on date
  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });
  
  // Handle adding a new incident
  const handleAddIncident = (newIncident: Omit<Incident, 'id' | 'reported_at'>) => {
    const incident: Incident = {
      ...newIncident,
      id: Math.max(0, ...incidents.map(i => i.id)) + 1,
      reported_at: new Date().toISOString(),
    };
    
    setIncidents(prevIncidents => [...prevIncidents, incident]);
    
    // Auto-select the filter matching the new incident's severity
    if (severityFilter !== newIncident.severity && severityFilter !== 'All') {
      setSeverityFilter(newIncident.severity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">AI Safety Incident Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Monitor and report AI safety incidents at HumanChain
          </p>
        </header>
        
        <main>
          <IncidentForm onSubmit={handleAddIncident} />
          
          <FilterControls
            severityFilter={severityFilter}
            setSeverityFilter={setSeverityFilter}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          
          <div className="mt-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-12 w-12 bg-blue-200 rounded-full"></div>
                  <div className="mt-2 text-gray-500">Loading incidents...</div>
                </div>
              </div>
            ) : (
              <IncidentList 
                incidents={sortedIncidents} 
                currentFilter={severityFilter} 
              />
            )}
          </div>
        </main>
        
        <footer className="mt-12 text-center text-gray-500 text-sm py-4 border-t">
          <p>© 2025 HumanChain - AI Safety Dashboard</p>
          <p className="mt-1 text-xs">Version 1.0.0</p>
        </footer>
      </div>
    </div>
  );
}

export default App;