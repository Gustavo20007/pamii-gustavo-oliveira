import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface Props {
  valor: string;
  aoMudar: (texto: string) => void;
  placeholder: string;
}

export default function InputCustom({ valor, aoMudar, placeholder }: Props) {
  return (
    <TextInput
      value={valor}
      onChangeText={aoMudar}
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