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


// CONTROLLERS


import {
  cadastrarLivro,
  buscarLivros
} from '../controllers/LivroController';

import {
  buscarCategorias
} from '../controllers/CategoriaController';


export default function Home() {


  // STATES


  // Nome do livro
  const [nomeLivro, setNomeLivro] =
    useState('');

  // Autor
  const [autor, setAutor] =
    useState('');

  // Categorias
  const [categorias, setCategorias] =
    useState<any[]>([]);

  // Categoria selecionada
  const [
    categoriaSelecionada,
    setCategoriaSelecionada
  ] = useState('');

  // Lista de livros
  const [livros, setLivros] =
    useState<any[]>([]);


  // CARREGAR DADOS


  useEffect(() => {

    carregarCategorias();

    carregarLivros();

  }, []);


  // CONSULTAR CATEGORIAS


  async function carregarCategorias() {

    const dados =
      await buscarCategorias();

    setCategorias(dados);
  }


  // CONSULTAR LIVROS
 

  async function carregarLivros() {

    const dados =
      await buscarLivros();

    setLivros(dados);
  }


  // SALVAR LIVRO


  async function salvarLivro() {

    try {

      // Chama controller
      await cadastrarLivro(

        nomeLivro,

        autor,

        categoriaSelecionada
      );

      Alert.alert(
        'Sucesso',
        'Livro cadastrado!'
      );

      // Limpa campos
      setNomeLivro('');
      setAutor('');

      // Atualiza lista
      carregarLivros();

    } catch (error: any) {

      Alert.alert(
        'Erro',
        error.message
      );
    }
  }


  
  // TELA


  return (

    <View style={styles.container}>

      {/* TÍTULO */}
      <Text style={styles.titulo}>
        Cadastro de Livros
      </Text>


      {/* INPUT LIVRO */}
      <TextInput
        placeholder="Nome do livro"
        placeholderTextColor="#999"
        value={nomeLivro}
        onChangeText={setNomeLivro}
        style={styles.input}
      />


      {/* INPUT AUTOR */}
      <TextInput
        placeholder="Autor"
        placeholderTextColor="#999"
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
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (

          <TouchableOpacity

            style={[

              styles.categoria,

              categoriaSelecionada ===
                item.nome &&

              styles.categoriaAtiva
            ]}

            onPress={() =>
              setCategoriaSelecionada(
                item.nome
              )
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

        onPress={salvarLivro}
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

            <Text style={styles.info}>
              Autor: {item.autor}
            </Text>

            <Text style={styles.info}>
              Categoria: {item.categoria}
            </Text>

          </View>
        )}
      />

    </View>
  );
}


// ====================================
// ESTILOS
// ====================================

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
    marginBottom: 10,
    marginTop: 10
  },

  categoria: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 10,
    marginRight: 10
  },

  categoriaAtiva: {
    backgroundColor: '#6200EE'
  },

  textoCategoria: {
    color: '#fff',
    fontWeight: 'bold'
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
    fontWeight: 'bold',
    fontSize: 16
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
  },

  info: {
    color: '#ccc',
    marginTop: 5
  }
});