import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface Props {
  valor: string; // valor digitado no input
  aoMudar: (texto: string) => void; // função chamada ao digitar
  placeholder: string; // texto de dica
}

export default function InputCustom({ valor, aoMudar, placeholder }: Props) {
  return (
    <TextInput
      value={valor} // valor controlado pelo estado
      onChangeText={aoMudar} // atualiza o estado ao digitar
      placeholder={placeholder}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  }
});