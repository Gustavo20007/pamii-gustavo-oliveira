import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface BotaoProps {
  titulo: string;
  corFundo?: string;
  corTexto?: string;
  aoPressionar: (valor: string) => void;
}

export default function Botao({
  titulo,
  corFundo = '#333',
  corTexto = '#fff',
  aoPressionar
}: BotaoProps) {
  return (
    <TouchableOpacity
      style={[styles.botao, { backgroundColor: corFundo }]}
      onPress={() => aoPressionar(titulo)}
    >
      <Text style={[styles.textoBotao, { color: corTexto }]}>
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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