
// importa o banco

import { db } from '../firebase/config';

// firestore

import {
  collection,
  getDocs
} from 'firebase/firestore';


// consulta categorias

export async function buscarCategorias() {

  // Consulta Firebase
  const querySnapshot = await getDocs(
    collection(db, 'categorias')
  );

  // Lista final
  const lista: any[] = [];

  // Percorre documentos
  querySnapshot.forEach((doc) => {

    lista.push({

      id: doc.id,

      ...doc.data()
    });
  });

  return lista;
}