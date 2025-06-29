import React, { useState } from 'react';
import ProgressBar from './ProgressBar'; // Progress bar for upload feedback

const UploadForm = () => {
  const [file, setFile] = useState(null); // Store the selected file
  const [error, setError] = useState(null); // Error message if file type is wrong
  const [isUploading, setIsUploading] = useState(false); // Track if upload is in progress

  const allowedTypes = ['image/png', 'image/jpeg', 'video/mp4', 'video/avi', 'video/mov'];
 // Supported file types

  const handleFileChange = (e) => {
    let selectedFile = e.target.files[0]; // Get the selected file

    if (!selectedFile) return; // If no file is selected, return early

    // Validate file type
    if (allowedTypes.includes(selectedFile.type)) {
      if (!isUploading) { // Prevent multiple uploads if already uploading
        setFile(selectedFile); // Set the file to be uploaded
        setError(null); // Clear any previous error messages
        e.target.value = null; // Reset the file input (this is necessary to allow re-uploading the same file)
      }
    } else {
      setFile(null);
      setError('Please select a valid image file (PNG or JPEG)');
    }
  };

  return (
    <form>
      <label>
        <input
          type="file"
          onChange={handleFileChange} // Handle file selection
          disabled={isUploading} // Disable the input if uploading is in progress
        />
        <span>+</span>
      </label>

      <div className="output">
        {error && <div className="error">{error}</div>} {/* Display error if file type is wrong */}
        {file && !isUploading && <div>{file.name}</div>} {/* Show file name if file is selected and not uploading */}
        {file && isUploading && <div>Uploading...</div>} {/* Show upload status */}

        {file && (
          <ProgressBar
            file={file}
            setFile={(uploadedFile) => {
              setIsUploading(false); // Stop uploading when done
              setFile(uploadedFile); // Set the uploaded file with URL
            }}
            setUploading={setIsUploading} // Pass the upload state function
          />
        )}
      </div>
    </form>
  );
};

export default UploadForm;