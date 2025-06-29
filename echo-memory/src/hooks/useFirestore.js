import { useState, useEffect } from 'react';
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const colRef = collection(db, collectionName);
    const q = query(colRef, orderBy('createdAt', 'desc')); // Correct query creation

    const unsub = onSnapshot(q, (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });

    return () => unsub(); // Cleanup the subscription on component unmount
  }, [collectionName]);

  return { docs };
};

export default useFirestore; 