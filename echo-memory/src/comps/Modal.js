import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projectFirestore } from '../firebase/config';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import './Modal.css';

const Modal = ({ setSelectedImg, selectedImg }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [peopleInPhoto, setPeopleInPhoto] = useState('');
  const [savedData, setSavedData] = useState({});

  // Load saved data from Firestore when the selected image changes
  useEffect(() => {
    const loadSavedData = async () => {
      if (selectedImg) {
        const q = query(collection(projectFirestore, 'events'), where('imageUrl', '==', selectedImg));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setEventName(data.eventName);
          setEventDate(data.eventDate);
          setPeopleInPhoto(data.peopleInPhoto);
          setSavedData((prevData) => ({
            ...prevData,
            [selectedImg]: data,
          }));
        } else {
          setEventName('');
          setEventDate('');
          setPeopleInPhoto('');
        }
      }
    };

    loadSavedData();
  }, [selectedImg]);

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  };

  const handleSave = async () => {
    const data = {
      eventName,
      eventDate,
      peopleInPhoto,
      imageUrl: selectedImg,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(projectFirestore, 'events'), data);
      alert('Data saved successfully!');

      setSavedData((prevData) => ({
        ...prevData,
        [selectedImg]: data,
      }));

      setEventName('');
      setEventDate('');
      setPeopleInPhoto('');
    } catch (error) {
      console.error("Error saving data: ", error.message);
      alert(`Error saving data: ${error.message}`);
    }
  };

  // Voice Assistant function to read saved data or input fields aloud
  const handleReadAloud = () => {
    const dataToRead = savedData[selectedImg]
      ? `
        Event Name: ${savedData[selectedImg].eventName || 'Not provided'},
        Event Date: ${savedData[selectedImg].eventDate || 'Not provided'},
        People in Photo: ${savedData[selectedImg].peopleInPhoto || 'Not provided'}
      `
      : `
        Event Name: ${eventName || 'Not provided'},
        Event Date: ${eventDate || 'Not provided'},
        People in Photo: ${peopleInPhoto || 'Not provided'}
      `;

    const utterance = new SpeechSynthesisUtterance(dataToRead);
    speechSynthesis.speak(utterance);
  };

  return (
    <motion.div className="backdrop" onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="modal-content">
        <motion.img src={selectedImg} alt="enlarged pic" 
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
        />

        <div className="text-display">
          {savedData[selectedImg] ? (
            <div>
              <div className="display-group">
                <p>{savedData[selectedImg].eventName}</p>
              </div>
              <div className="display-group">
                <p>{savedData[selectedImg].eventDate}</p>
              </div>
              <div className="display-group">
                <p>{savedData[selectedImg].peopleInPhoto}</p>
              </div>
            </div>
          ) : (
            <div className="input-fields">
              <div className="display-group">
                <input 
                  type="text" 
                  placeholder="Name of the Event" 
                  value={eventName} 
                  onChange={(e) => setEventName(e.target.value)} 
                />
              </div>
              <div className="display-group">
                <input 
                  type="date" 
                  value={eventDate} 
                  onChange={(e) => setEventDate(e.target.value)} 
                />
              </div>
              <div className="display-group">
                <input 
                  type="text" 
                  placeholder="People in the photo" 
                  value={peopleInPhoto} 
                  onChange={(e) => setPeopleInPhoto(e.target.value)} 
                />
              </div>
            </div>
          )}
        </div>

        <div className="button-group">
          {!savedData[selectedImg] && <button onClick={handleSave}>Save</button>}
          <button onClick={handleReadAloud}>Read Aloud</button>
        </div>
      </div>
    </motion.div>
  );
};

export default Modal;
