import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import BotaoCustom from "./BotaoCustom";

interface Props {
  aberto: boolean; // controla se o modal aparece
  BotaoConfirmacao: string; // texto do botão confirmar
  BotaoCancelar: string; // texto do botão cancelar
  aoConfirmar: () => void; // ação ao confirmar
  aoCancelar: () => void; // ação ao cancelar
}

export default function ModalCustom({
  aberto,
  BotaoConfirmacao,
  BotaoCancelar,
  aoConfirmar,
  aoCancelar
}: Props) {
  return (
    <Modal visible={aberto} transparent animationType="fade">
      {/* fundo escuro */}
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.titulo}>Confirmação</Text>
          <Text>Deseja adicionar este item?</Text>

          {/* botão confirmar */}
          <BotaoCustom
            cor="green"
            texto={BotaoConfirmacao}
            aoClicar={aoConfirmar}
          />

          {/* botão cancelar */}
          <BotaoCustom
            cor="red"
            texto={BotaoCancelar}
            aoClicar={aoCancelar}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // fundo escuro
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center"
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  }
});