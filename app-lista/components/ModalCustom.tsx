import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import BotaoCustom from "./BotaoCustom";

interface Props {
  aberto: boolean;
  BotaoConfirmacao: string;
  BotaoCancelar: string;
  aoConfirmar: () => void;
  aoCancelar: () => void;
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
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.titulo}>Confirmação</Text>
          <Text>Deseja adicionar este item?</Text>

          <BotaoCustom
            cor="green"
            texto={BotaoConfirmacao}
            aoClicar={aoConfirmar}
          />

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
    backgroundColor: "rgba(0,0,0,0.5)",
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