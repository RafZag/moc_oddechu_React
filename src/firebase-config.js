// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD6GxPpdTOML9m63rGmAVn6ATy7vWPPYi8',
  authDomain: 'moc-oddechu.firebaseapp.com',
  databaseURL: 'https://moc-oddechu-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'moc-oddechu',
  storageBucket: 'moc-oddechu.appspot.com',
  messagingSenderId: '729474953432',
  appId: '1:729474953432:web:52da61ec1e5cfa1d7427ad',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
