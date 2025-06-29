import React, { useState } from 'react';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';
import ImageGrid from './comps/ImageGrid';
import Modal from './comps/Modal';
import Slideshow from './comps/Slideshow';
import AboutDementia from './comps/AboutDementia';
import AudioLibrary from './comps/AudioLibrary'; // Import the new AudioLibrary component

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [showAboutDementia, setShowAboutDementia] = useState(false);

  return (
    <div className="App" style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <Title />
        <UploadForm />
        <ImageGrid setSelectedImg={setSelectedImg} />
        <button 
          onClick={() => setShowSlideshow(true)} 
          style={{ 
            position: 'fixed', 
            top: '10px', 
            right: '10px', 
            backgroundColor: '#FFB6C1', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '8px', 
            padding: '10px 20px', 
            fontFamily: "'Comic Sans MS', cursive, sans-serif", 
            fontSize: '16px', 
            cursor: 'pointer', 
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
            transition: 'background-color 0.3s ease' 
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#FF69B4'} 
          onMouseLeave={(e) => e.target.style.backgroundColor = '#FFB6C1'}
        >
          View Slideshow
        </button>

        <button 
          onClick={() => setShowAboutDementia(true)} 
          style={{ 
            position: 'fixed', 
            bottom: '10px', 
            right: '10px', 
            backgroundColor: '#ADD8E6', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '8px', 
            padding: '10px 20px', 
            fontFamily: "'Comic Sans MS', cursive, sans-serif", 
            fontSize: '16px', 
            cursor: 'pointer', 
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
            transition: 'background-color 0.3s ease' 
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#87CEFA'} 
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ADD8E6'}
        >
          About Dementia
        </button>

        {showAboutDementia && (
          <AboutDementia setShowAboutDementia={setShowAboutDementia} />
        )}

        {selectedImg && (
          <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
        )}

        {showSlideshow && (
          <Slideshow setShowSlideshow={setShowSlideshow} />
        )}
      </div>

      {/* Audio library section */}
      <AudioLibrary />
    </div>
  );
}

export default App;
