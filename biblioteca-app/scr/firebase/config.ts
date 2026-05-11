// Importa o Firebase
import { initializeApp } from 'firebase/app';

// Importa o Firestore
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAGy8o7x876ICGlnwWdBWCSPTUnpAS9Lyo",
  authDomain: "biblioteca-app-99b36.firebaseapp.com",
  projectId: "biblioteca-app-99b36",
  storageBucket: "biblioteca-app-99b36.firebasestorage.app",
  messagingSenderId: "1973379905",
  appId: "1:1973379905:web:fb8ba9c1dae29d1b0e37c0"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o banco
export const db = getFirestore(app);