import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth'; // Import getAuth for Firebase Authentication

// Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket:  process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId:  process.env.REACT_APP_FIREBASE_MESSAGING_SENDER,
	appId:  process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
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
