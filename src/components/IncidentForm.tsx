import React, { useState } from 'react';
import { Incident } from '../types/incident';

interface IncidentFormProps {
  onSubmit: (incident: Omit<Incident, 'id' | 'reported_at'>) => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'Low' | 'Medium' | 'High'>('Low');
  const [formVisible, setFormVisible] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors: { title?: string; description?: string } = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call with slight delay
      setTimeout(() => {
        onSubmit({
          title,
          description,
          severity
        });
        
        // Reset form
        setTitle('');
        setDescription('');
        setSeverity('Low');
        setIsSubmitting(false);
        
        // Show success message
        setSuccessMessage('Incident reported successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        
        // Hide form after submission
        setFormVisible(false);
      }, 500);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setSeverity('Low');
    setErrors({});
    setFormVisible(false);
  };

  return (
    <div className="mb-8">
      {successMessage && (
        <div className="p-2 bg-green-100 text-green-600 rounded-md text-center mb-4">
          {successMessage}
        </div>
      )}
      
      {!formVisible ? (
        <button
          onClick={() => setFormVisible(true)}
          className="btn btn-success w-full"
        >
          + Report New Incident
        </button>
      ) : (
        <div className="form-container">
          <h2 className="form-title">Report New AI Safety Incident</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="title">
                Title: <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`form-input ${errors.title ? 'error' : ''}`}
                placeholder="Enter incident title"
                disabled={isSubmitting}
              />
              {errors.title && <p className="form-error">{errors.title}</p>}
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="description">
                Description: <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`form-input ${errors.description ? 'error' : ''}`}
                rows={4}
                placeholder="Describe the incident in detail"
                disabled={isSubmitting}
              />
              {errors.description && (
                <p className="form-error">{errors.description}</p>
              )}
            </div>
            
            <div className="form-group">
              <label className="form-label">
                Severity: <span className="text-red-500">*</span>
              </label>
              <div className="form-radio-group">
                {['Low', 'Medium', 'High'].map((level) => (
                  <label key={level} className="form-radio-label">
                    <input
                      type="radio"
                      name="severity"
                      value={level}
                      checked={severity === level}
                      onChange={() => setSeverity(level as 'Low' | 'Medium' | 'High')}
                      className="form-radio"
                      disabled={isSubmitting}
                    />
                    <span className={level === 'High' ? 'text-red-600' : level === 'Medium' ? 'text-orange-600' : 'text-yellow-600'}>
                      {level}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="form-actions">
              <button
                type="submit"
                className={`btn btn-primary ${isSubmitting ? 'opacity-70' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Incident'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default IncidentForm;