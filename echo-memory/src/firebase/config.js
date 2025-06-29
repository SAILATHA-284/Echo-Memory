import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth'; // Import getAuth for Firebase Authentication

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyA3KY15CyvsD7wFjohCMq3miPixmJ86xsE",
  authDomain: "echo-memory-wow.firebaseapp.com",
  projectId: "echo-memory-wow",
  storageBucket: "echo-memory-wow.appspot.com",
  messagingSenderId: "186767368133",
  appId: "1:186767368133:web:69902e4df56b1e1fe175ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Authentication
const timestamp = serverTimestamp();

// Export the services to use them in other parts of your app
export { projectStorage, projectFirestore, auth, timestamp };
