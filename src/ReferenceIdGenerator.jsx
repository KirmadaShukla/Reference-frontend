import { useState } from 'react';
import { generateReferenceId } from './api/referenceIdService';

const ReferenceIdGenerator = () => {
  const [referenceId, setReferenceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to generate a 19-digit reference ID
  const handleGenerateReferenceId = async () => {
    setLoading(true);
    setError('');
    
    try {
      const id = await generateReferenceId();
      setReferenceId(id);
    } catch (err) {
      setError('Failed to generate reference ID. Please try again.');
      console.error('Error generating reference ID:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Reference ID Generator</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="referenceId" style={{ display: 'block', marginBottom: '5px' }}>
          Reference ID:
        </label>
        <input
          id="referenceId"
          type="text"
          value={referenceId}
          readOnly
          placeholder="Click 'Generate' to create a reference ID"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
      </div>
      
      <button
        onClick={handleGenerateReferenceId}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          width: '100%'
        }}
      >
        {loading ? 'Generating...' : 'Generate Reference ID'}
      </button>
      
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </div>
      )}
      
      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        <p>A 19-digit reference ID will be automatically generated and filled in the input field above.</p>
      </div>
    </div>
  );
};

export default ReferenceIdGenerator;