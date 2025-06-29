// Slideshow.js
import React, { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import './Slideshow.css';

function Slideshow({ setShowSlideshow }) {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const q = query(collection(projectFirestore, 'images'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const imageUrls = snapshot.docs.map(doc => doc.data().url);
      setImages(imageUrls);
    });
    return () => unsubscribe();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="slideshow-overlay">
      <button onClick={() => setShowSlideshow(false)} className="close-slideshow">X</button>

      <div className="slideshow-content">
        {images.length > 0 ? (
          <img src={images[currentIndex]} alt="Slideshow" />
        ) : (
          <p>Loading images...</p>
        )}

        <button onClick={prevSlide} className="prev-slide">&#9664;</button>
        <button onClick={nextSlide} className="next-slide">&#9654;</button>
      </div>

      <style jsx>{`
        .slideshow-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          color: white;
        }

        .slideshow-content img {
          max-width: 80%;
          max-height: 80%;
          border-radius: 8px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }

        .close-slideshow,
        .prev-slide,
        .next-slide {
          position: absolute;
          background: rgba(255, 255, 255, 0.7);
          border: none;
          border-radius: 50%;
          padding: 12px;
          cursor: pointer;
          font-size: 24px;
          color: #333;
          font-weight: bold;
          transition: background 0.3s ease;
        }

        .close-slideshow {
          top: 20px;
          right: 20px;
        }

        .prev-slide {
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
        }

        .next-slide {
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
        }

        .close-slideshow:hover,
        .prev-slide:hover,
        .next-slide:hover {
          background: rgba(255, 255, 255, 0.9);
        }
      `}</style>
    </div>
  );
}

export default Slideshow;
