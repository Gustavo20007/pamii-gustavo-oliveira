// ====================================
// IMPORTA BANCO
// ====================================

import { db } from '../firebase/config';


// ====================================
// FIRESTORE
// ====================================

import {
  collection,
  addDoc,
  getDocs
} from 'firebase/firestore';


// ====================================
// CADASTRAR LIVRO
// ====================================

export async function cadastrarLivro(

  nomeLivro: string,

  autor: string,

  categoriaSelecionada: string
) {

  // ========================
  // VALIDAÇÕES
  // ========================

  // Nome vazio
  if (!nomeLivro.trim()) {

    throw new Error(
      'Digite o nome do livro'
    );
  }

  // Nome pequeno
  if (nomeLivro.length < 3) {

    throw new Error(
      'Nome precisa ter 3 letras'
    );
  }

  // Autor vazio
  if (!autor.trim()) {

    throw new Error(
      'Digite o autor'
    );
  }

  // Categoria vazia
  if (!categoriaSelecionada) {

    throw new Error(
      'Selecione uma categoria'
    );
  }


  // ========================
  // CADASTRO FIREBASE
  // ========================

  await addDoc(

    collection(db, 'livros'),

    {

      nome: nomeLivro,

      autor: autor,

      categoria: categoriaSelecionada,

      criadoEm: new Date()
    }
  );
}


// ====================================
// CONSULTAR LIVROS
// ====================================

export async function buscarLivros() {

  // Busca documentos
  const querySnapshot = await getDocs(
    collection(db, 'livros')
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