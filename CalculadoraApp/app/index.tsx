import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

interface BotaoProps {
  titulo: string;
  corFundo?: string;
  corTexto?: string;
}

export default function Index() {
  const [expressao, setExpressao] = useState<string>('');
  const [resultado, setResultado] = useState<string>('');

  const operadores = ['+', '-', '*', '/', '.'];

  // ✅ corrigido (sem "=" duplicado)
  const linhasDeBotoes = [
    ['C', '(', ')', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  const obterCorFundo = (botao: string): string => {
    if (botao === '=') return '#00ffcc'; // verde neon
    if (botao === 'C') return '#ff3b3b'; // vermelho
    if (['(', ')', '/', '*', '+', '-'].includes(botao)) return '#a855f7'; // roxo
    return '#2a2a3d'; // números
  };

  const lidarComToque = (valor: string): void => {
    if (valor === 'C') {
      setExpressao('');
      setResultado('');
    } else if (valor === '=') {
      try {
        const expressaoFormatada = expressao
          .replace(/x/g, '*')
          .replace(/,/g, '.');

        const resultadoCalculado = eval(expressaoFormatada);

        setResultado(String(resultadoCalculado));
        setExpressao(String(resultadoCalculado));
      } catch (e) {
        setResultado('Erro');
      }
    } else {
      if (operadores.includes(valor)) {
        if (expressao === '' && valor !== '-') return;

        const ultimoCaractere = expressao.slice(-1);

        if (operadores.includes(ultimoCaractere)) {
          const novaExpressao = expressao.slice(0, -1) + valor;
          setExpressao(novaExpressao);
          return;
        }
      }

      const novaExpressao = expressao + valor;
      setExpressao(novaExpressao);
    }
  };

  const Botao: React.FC<BotaoProps> = ({
    titulo,
    corFundo = '#333',
    corTexto = '#fff'
  }) => (
    <TouchableOpacity
      style={[styles.botao, { backgroundColor: corFundo }]}
      onPress={() => lidarComToque(titulo)}
    >
      <Text style={[styles.textoBotao, { color: corTexto }]}>
        {titulo}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* DISPLAY */}
      <View style={styles.displayContainer}>
        <Text style={styles.textoExpressao}>
          {expressao || '0'}
        </Text>
        <Text style={styles.textoResultado}>
          {resultado}
        </Text>
      </View>

      {/* TECLADO */}
      <View style={styles.tecladoContainer}>
        {linhasDeBotoes.map((linha, indexLinha) => (
          <View key={indexLinha} style={styles.linha}>
            {linha.map((botao) => (
              <Botao
                key={botao}
                titulo={botao}
                corFundo={obterCorFundo(botao)}
              />
            ))}
          </View>
        ))}
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2f',
  },

  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },

  textoExpressao: {
    fontSize: 28,
    color: '#aaa',
  },

  textoResultado: {
    fontSize: 52,
    color: '#fff',
    fontWeight: 'bold',
  },

  tecladoContainer: {
    padding: 10,
  },

  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  botao: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },

  textoBotao: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});