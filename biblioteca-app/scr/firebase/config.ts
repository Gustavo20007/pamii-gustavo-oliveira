// Importa o Firebase
import { initializeApp } from 'firebase/app';

// Importa o Firestore
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {

};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o banco
export const db = getFirestore(app);
