// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "velora-7c70e.firebaseapp.com",
  projectId: "velora-7c70e",
  storageBucket: "velora-7c70e.firebasestorage.app",
  messagingSenderId: "873853105088",
  appId: "1:873853105088:web:7d3a02e4818379d1e70e25",
  measurementId: "G-GB42W5QDY2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default function MyComponent() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      getAnalytics(app); // Runs only on the client
    }
  }, []);

  return <div>My Component</div>;
}