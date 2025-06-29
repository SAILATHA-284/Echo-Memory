import React, { useState } from 'react';
import { projectFirestore, projectStorage } from '../firebase/config'; // Import Firebase config
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import './AudioLibrary.css'; // Import the CSS file for styling

const AudioLibrary = () => {
  const [audioFiles, setAudioFiles] = useState([]); // For storing multiple audio files
  const [audioURLs, setAudioURLs] = useState([]); // To store the URLs of uploaded audio files

  const handleFileChange = (e) => {
    setAudioFiles([...e.target.files]);
  };

  const handleUpload = () => {
    if (audioFiles.length === 0) return;

    audioFiles.forEach((audioFile) => {
      // Create a storage reference for each audio file
      const audioRef = ref(projectStorage, `audios/${audioFile.name}`);

      // Upload the file
      const uploadTask = uploadBytesResumable(audioRef, audioFile);

      // Monitor the upload progress
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Optional: handle progress here (e.g., show a progress bar)
        },
        (error) => {
          console.error(error);
        },
        async () => {
          // Get the download URL for the uploaded file
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Store the audio metadata in Firestore
          await addDoc(collection(projectFirestore, 'audios'), {
            name: audioFile.name,
            url: downloadURL,
          });

          // Add the audio URL to the state
          setAudioURLs((prevState) => [...prevState, { name: audioFile.name, url: downloadURL }]);
        }
      );
    });
  };

  return (
    <div className="audio-library">
      <h3>Audio Library</h3>

      {/* File input to select multiple audio files */}
      <input
        type="file"
        accept="audio/*"
        multiple
        onChange={handleFileChange}
      />
      <button onClick={handleUpload} className="upload-button">
        Upload Audio(s)
      </button>

      <div className="playlist">
        {/* Display all uploaded audio files as a playlist */}
        {audioURLs.length > 0 ? (
          audioURLs.map((audio, index) => (
            <div key={index} className="audio-item">
              <h4>{audio.name}</h4>
              <audio controls>
                <source src={audio.url} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))
        ) : (
          <p>No audio files uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default AudioLibrary;
