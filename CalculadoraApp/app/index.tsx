import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Botao from "../components/botao";

export default function Index() {
  const [expressao, setExpressao] = useState<string>("");
  const [resultado, setResultado] = useState<string>("0");

  const operadores = ["+", "-", "x", "÷", "."];

  const linhasDeBotoes = [
    ["C", "(", ")", "÷"],
    ["7", "8", "9", "x"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "⌫", "="],
  ];

  const obterCorFundo = (botao: string): string => {
    if (botao === "=") return "#00ffcc";
    if (botao === "C") return "#ff3b3b";
    if (botao === "⌫") return "#f59e0b";
    if (["(", ")", "/", "*", "+", "-"].includes(botao)) return "#a855f7";
    return "#2a2a3d";
  };

  const lidarComToque = (valor: string): void => {
    if (valor === "C") {
      setExpressao("");
      setResultado("");
    } else if (valor === "⌫") {
      const novaExpressao = expressao.slice(0, -1);
      setExpressao(novaExpressao);
    } else if (valor === "=") {
      try {
        const expressaoFormatada = expressao
          .replace(/x/g, "*")
          .replace(/÷/g, "/");
        const resultadoCalculado = eval(expressaoFormatada);

        setResultado(String(resultadoCalculado));
        setExpressao(String(resultadoCalculado));
      } catch (e) {
        setResultado("Erro");
      }
    } else {
      if (operadores.includes(valor)) {
        if (expressao === "" && valor !== "-") return;

        const ultimoCaractere = expressao.slice(-1);

        if (operadores.includes(ultimoCaractere)) {
          const novaExpressao = expressao.slice(0, -1) + valor;
          setExpressao(novaExpressao);
          setResultado(novaExpressao);
          return;
        }
      }

      const novaExpressao = expressao + valor;
      setExpressao(novaExpressao);
      setResultado(novaExpressao);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text
          style={styles.textoDisplay}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {resultado}
        </Text>
      </View>

      <View style={styles.tecladoContainer}>
        {linhasDeBotoes.map((linha, indexLinha) => (
          <View key={indexLinha} style={styles.linha}>
            {linha.map((botao) => (
              <Botao
                key={botao}
                titulo={botao}
                corFundo={obterCorFundo(botao)}
                aoPressionar={lidarComToque}
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
    backgroundColor: "#000000",
  },
  displayContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
  },
  textoDisplay: {
    fontSize: 70,
    color: "#ffffff",
    fontWeight: "300",
  },
  tecladoContainer: {
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
