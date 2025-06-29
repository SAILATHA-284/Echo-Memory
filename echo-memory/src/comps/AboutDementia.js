import React from 'react';
import './AboutDementia.css'; // Import CSS for styling

const AboutDementia = ({ setShowAboutDementia }) => {
  return (
    <div className="about-dementia-modal">
      <div className="modal-content">
        <button 
          className="close-button" 
          onClick={() => setShowAboutDementia(false)} // Close the modal
        >
          X
        </button>

        <div className="book-container">
          {/* About Dementia Section */}
          <div className="about-section">
            <h2>About Dementia</h2>
            <p>
              Dementia is a term used to describe a group of symptoms affecting memory, thinking, and social abilities severely enough to interfere with daily life. 
              It is caused by damage to brain cells, which affects the ability to think, remember, and make decisions. 
            </p>
            <p>
              Some common symptoms of dementia include:
              <ul>
                <li>Memory loss</li>
                <li>Difficulty communicating</li>
                <li>Difficulty with reasoning or problem-solving</li>
                <li>Confusion and disorientation</li>
                <li>Changes in mood and behavior</li>
              </ul>
            </p>
            <p>
              Early diagnosis and intervention can improve quality of life and provide care options.
            </p>
          </div>

          {/* Dementia Cure Section */}
          <div className="cure-section">
            <h2>Dementia Cure</h2>
            <p>
              While there is currently no cure for dementia, there are treatments that can help manage symptoms and improve quality of life. These treatments include:
            </p>
            <ul>
              <li>Medications: Certain drugs can help manage symptoms like memory loss and confusion.</li>
              <li>Cognitive therapies: These therapies help patients retain cognitive function and improve their problem-solving skills.</li>
              <li>Physical activity: Regular exercise can improve brain health and slow down the progression of dementia.</li>
              <li>Healthy diet: A balanced diet with nutrients like omega-3 fatty acids and antioxidants can support brain health.</li>
              <li>Social engagement: Staying socially active can help maintain mental health and reduce feelings of isolation.</li>
            </ul>
            <p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDementia;
