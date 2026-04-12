import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  dados: string[];
}

export default function TabelaCustom({ dados }: Props) {
  return (
    <View style={styles.tabela}>
      <Text style={styles.titulo}>Lista</Text>

      {dados.map((item, index) => (
        <View key={index} style={styles.linha}>
          <Text>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabela: {
    marginTop: 20
  },
  titulo: {
    fontWeight: "bold",
    marginBottom: 10
  },
  linha: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc"
  }
});