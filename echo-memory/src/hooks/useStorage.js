import { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { projectStorage, projectFirestore } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Import serverTimestamp

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // Track if file is being uploaded

  useEffect(() => {
    if (!file) return; // Prevent running if file is null
    if (isUploading) return; // Prevent starting a new upload if one is already in progress

    // Set isUploading to true to prevent duplicate uploads
    setIsUploading(true);

    const storageRef = ref(projectStorage, file.name);
    const collectionRef = collection(projectFirestore, 'images'); // Reference to 'images' collection

    // Create an upload task for the file
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snap) => {
        const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage); // Update progress bar
      },
      (err) => {
        setError(err); // Set error if any occurs during upload
        setIsUploading(false); // Reset isUploading on error
      },
      async () => {
        // When upload is complete
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collectionRef, {
          url: downloadURL,
          createdAt: serverTimestamp(), // Use serverTimestamp() instead of timestamp
        });
        setUrl(downloadURL); // Set the download URL in state
        setIsUploading(false); // Reset isUploading after upload is done
      }
    );

    // Clean up if the file is changed before the upload finishes
    return () => {
      if (uploadTask && uploadTask.snapshot.state !== 'completed') {
        uploadTask.cancel(); // Cancel the upload if component unmounts or file changes
        setIsUploading(false); // Reset uploading state
      }
    };
  }, [file, isUploading]); // Dependency array ensures that the effect runs when `file` or `isUploading` changes

  return { progress, url, error, isUploading }; // Return the progress, URL, error, and isUploading
};

export default useStorage;
