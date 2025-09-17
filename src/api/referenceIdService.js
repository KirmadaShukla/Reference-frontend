// API service for reference ID generation

/**     
 * Generate a 19-digit reference ID from the backend
 * @returns {Promise<string>} The generated 19-digit reference ID
 */
export const generateReferenceId = async () => {
  try {
    const response = await fetch('/api/generate-reference-id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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