// API service for reference ID generation

/**     
 * Generate a 19-digit reference ID from the backend
 * @returns {Promise<string>} The generated 19-digit reference ID
 */
export const generateReferenceId = async () => {
  try {
    // Use environment variable for API base URL, fallback to localhost for development
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    const response = await fetch(`${baseUrl}/api/generate-reference-id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}) // Send empty body instead of dateOfBirth
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.referenceId;
  } catch (error) {
    console.error('Error generating reference ID:', error);
    throw new Error('Failed to generate reference ID');
  }
};