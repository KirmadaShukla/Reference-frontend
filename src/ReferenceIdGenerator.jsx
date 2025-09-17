import { useState, useEffect } from 'react';
import { generateReferenceId } from './api/referenceIdService';

const ReferenceIdGenerator = () => {
  const [referenceId, setReferenceId] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Generate CAPTCHA text
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
  };

  // Function to generate a 19-digit reference ID (without DOB validation)
  const handleGenerateReferenceId = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);
    setSubmitted(false);
    
    try {
      // Generate reference ID without DOB (DOB will be validated during submission)
      const id = await generateReferenceId(); // No parameter needed
      setReferenceId(id);
      setSuccess(true);
    } catch (err) {
      setError('Failed to generate reference ID. Please try again.');
      console.error('Error generating reference ID:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleGenerateReferenceId();
  };

  // Handle submit button click (after reference ID is generated)
  const handleSubmitReferenceId = async () => {
    // Validate CAPTCHA
    if (captchaInput !== captchaText) {
      setError('CAPTCHA does not match. Please try again.');
      generateCaptcha(); // Generate new CAPTCHA
      setCaptchaInput('');
      return;
    }

    // Validate Date of Birth
    if (!dateOfBirth) {
      setError('Please enter your date of birth.');
      return;
    }

    // Validate date format
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dobRegex.test(dateOfBirth)) {
      setError('Please enter date of birth in YYYY-MM-DD format.');
      return;
    }

    // Here we'll send the reference ID and date of birth to the backend
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${baseUrl}/api/submit-reference-id`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ referenceId, dateOfBirth })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setSubmitted(true);
      alert(`Reference ID ${referenceId} has been submitted successfully!`);
    } catch (err) {
      console.error('Error submitting reference ID:', err);
      alert('Failed to submit reference ID. Please try again.');
    }
  };

  // Handle reset button click
  const handleReset = () => {
    setReferenceId('');
    setDateOfBirth('');
    setCaptchaInput('');
    setError('');
    setSuccess(false);
    setSubmitted(false);
    generateCaptcha();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Tracking ID </h2>
      
      <form onSubmit={handleSubmit}>
        {/* Reference ID Field */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="referenceId" style={{ display: 'block', marginBottom: '5px' }}>
            Tracking ID:
          </label>
          <input
            id="referenceId"
            type="text"
            value={referenceId}
            readOnly
            placeholder="Will be generated automatically"
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
        
        {/* Generate Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            width: '100%',
            marginBottom: '10px'
          }}
        >
          {loading ? 'Generating...' : 'Generate Reference ID'}
        </button>
      </form>
      
      {/* Submission Form (shown after successful generation) */}
      {success && !submitted && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '4px' }}>
          <h3>Submit Reference ID</h3>
          
          {/* Date of Birth Field */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="dateOfBirth" style={{ display: 'block', marginBottom: '5px' }}>
              Date of Birth (YYYY-MM-DD)*
            </label>
            <input
              id="dateOfBirth"
              type="text"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              placeholder="YYYY-MM-DD"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>
          
          {/* CAPTCHA Section */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Enter the text shown in image*
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                padding: '10px',
                fontSize: '24px',
                fontWeight: 'bold',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ccc',
                borderRadius: '4px',
                letterSpacing: '5px',
                userSelect: 'none'
              }}>
                {captchaText}
              </div>
              <button
                type="button"
                onClick={generateCaptcha}
                style={{
                  padding: '10px',
                  fontSize: '14px',
                  backgroundColor: '#e9ecef',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Refresh
              </button>
            </div>
            <input
              type="text"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              placeholder="Enter CAPTCHA"
              style={{
                width: '100%',
                marginTop: '10px',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>
          
          {/* Submit and Reset Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              onClick={handleSubmitReferenceId}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '4px',
                cursor: 'pointer',
                flex: 1
              }}
            >
              Submit
            </button>
            <button
              onClick={handleReset}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '4px',
                cursor: 'pointer',
                flex: 1
              }}
            >
              Reset
            </button>
          </div>
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </div>
      )}
      
      {/* Success Message */}
      {success && !submitted && (
        <div style={{ color: 'green', marginTop: '10px' }}>
          Reference ID generated successfully! Please fill in the details below to submit.
        </div>
      )}
      
      {/* Submitted Message */}
      {submitted && (
        <div style={{ color: 'green', marginTop: '10px' }}>
          Reference ID submitted successfully!
        </div>
      )}
      
      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        <p>A 19-digit reference ID will be automatically generated. After generation, please provide your date of birth and CAPTCHA to submit.</p>
      </div>
    </div>
  );
};

export default ReferenceIdGenerator;