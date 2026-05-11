import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert
} from 'react-native';

// Importa banco
import { db } from '../firebase/config';

// Funções do Firestore
import {
  collection,
  addDoc,
  getDocs
} from 'firebase/firestore';

export default function Home() {

  // Nome do livro
  const [nomeLivro, setNomeLivro] = useState('');

  // Autor
  const [autor, setAutor] = useState('');

  // Categorias vindas do Firebase
  const [categorias, setCategorias] = useState<any[]>([]);

  // Categoria selecionada
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

  // Lista de livros
  const [livros, setLivros] = useState<any[]>([]);

  // Carrega categorias e livros
  useEffect(() => {
    buscarCategorias();
    buscarLivros();
  }, []);

  // Buscar categorias
  async function buscarCategorias() {

    const querySnapshot = await getDocs(
      collection(db, 'categorias')
    );

    const lista: any[] = [];

    querySnapshot.forEach((doc) => {
      lista.push({
        id: doc.id,
        ...doc.data()
      });
    });

    setCategorias(lista);
  }

  // Buscar livros
  async function buscarLivros() {

    const querySnapshot = await getDocs(
      collection(db, 'livros')
    );

    const lista: any[] = [];

    querySnapshot.forEach((doc) => {
      lista.push({
        id: doc.id,
        ...doc.data()
      });
    });

    setLivros(lista);
  }

  // Cadastro do livro
  async function cadastrarLivro() {

    // ===== VALIDAÇÕES =====

    // Verifica nome vazio
    if (!nomeLivro.trim()) {
      Alert.alert('Erro', 'Digite o nome do livro');
      return;
    }

    // Verifica tamanho mínimo
    if (nomeLivro.length < 3) {
      Alert.alert(
        'Erro',
        'Nome precisa ter no mínimo 3 letras'
      );
      return;
    }

    // Verifica autor
    if (!autor.trim()) {
      Alert.alert('Erro', 'Digite o autor');
      return;
    }

    // Verifica categoria
    if (!categoriaSelecionada) {
      Alert.alert(
        'Erro',
        'Selecione uma categoria'
      );
      return;
    }

    try {

      // Salva no Firebase
      await addDoc(collection(db, 'livros'), {

        nome: nomeLivro,
        autor: autor,
        categoria: categoriaSelecionada,

        // Data do cadastro
        criadoEm: new Date()
      });

      Alert.alert(
        'Sucesso',
        'Livro cadastrado!'
      );

      // Limpa campos
      setNomeLivro('');
      setAutor('');

      // Atualiza lista
      buscarLivros();

    } catch (error) {

      Alert.alert(
        'Erro',
        'Falha ao cadastrar'
      );
    }
  }

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Cadastro de Livros
      </Text>

      {/* INPUT LIVRO */}
      <TextInput
        placeholder="Nome do livro"
        value={nomeLivro}
        onChangeText={setNomeLivro}
        style={styles.input}
      />

      {/* INPUT AUTOR */}
      <TextInput
        placeholder="Autor"
        value={autor}
        onChangeText={setAutor}
        style={styles.input}
      />

      {/* CATEGORIAS */}
      <Text style={styles.subtitulo}>
        Categorias
      </Text>

      <FlatList
        horizontal
        data={categorias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <TouchableOpacity
            style={[
              styles.categoria,
              categoriaSelecionada === item.nome &&
                styles.categoriaAtiva
            ]}
            onPress={() =>
              setCategoriaSelecionada(item.nome)
            }
          >

            <Text style={styles.textoCategoria}>
              {item.nome}
            </Text>

          </TouchableOpacity>
        )}
      />

      {/* BOTÃO */}
      <TouchableOpacity
        style={styles.botao}
        onPress={cadastrarLivro}
      >

        <Text style={styles.textoBotao}>
          Cadastrar Livro
        </Text>

      </TouchableOpacity>

      {/* LISTA */}
      <Text style={styles.subtitulo}>
        Livros cadastrados
      </Text>

      <FlatList
        data={livros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.nomeLivro}>
              {item.nome}
            </Text>

            <Text>
              Autor: {item.autor}
            </Text>

            <Text>
              Categoria: {item.categoria}
            </Text>

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    paddingTop: 60
  },

  titulo: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20
  },

  input: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },

  subtitulo: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10
  },

  categoria: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    marginRight: 10
  },

  categoriaAtiva: {
    backgroundColor: '#6200EE'
  },

  textoCategoria: {
    color: '#fff'
  },

  botao: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold'
  },

  card: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },

  nomeLivro: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});