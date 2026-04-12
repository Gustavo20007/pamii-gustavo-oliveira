import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  cor: string;
  texto: string;
  aoClicar: () => void;
}

export default function BotaoCustom({ cor, texto, aoClicar }: Props) {
  return (
    <TouchableOpacity
      style={[styles.botao, { backgroundColor: cor }]}
      onPress={aoClicar}
    >
      <Text style={styles.texto}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: "center"
  },
  texto: {
    color: "#fff",
    fontWeight: "bold"
  }
});