import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCfA0cmnWcHz-1Y4UnOFOP6e78DXFpKv8I',
  authDomain: 'nanny-service-d413e.firebaseapp.com',
  databaseURL: 'https://nanny-service-d413e-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'nanny-service-d413e',
  storageBucket: 'nanny-service-d413e.firebasestorage.app',
  messagingSenderId: '185012228250',
  appId: '1:185012228250:web:275bf25a5d4cceedb10f23',
  measurementId: 'G-649QBF2EMM',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
