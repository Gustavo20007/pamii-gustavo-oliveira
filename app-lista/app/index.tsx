import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import InputCustom from "../components/InputCustom";
import BotaoCustom from "../components/BotaoCustom";
import TabelaCustom from "../components/TabelaCustom";
import ModalCustom from "../components/ModalCustom";

export default function Index() {
  const [valorInput, setValorInput] = useState("");
  const [listaItens, setListaItens] = useState<string[]>([]);
  const [modalAberto, setModalAberto] = useState(false);

  function abrirModal() {
    if (valorInput !== "") {
      setModalAberto(true);
    }
  }

  function confirmarAcao() {
    setListaItens([...listaItens, valorInput]);
    setValorInput("");
    setModalAberto(false);
  }

  function cancelarAcao() {
    setModalAberto(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <InputCustom
        valor={valorInput}
        aoMudar={setValorInput}
        placeholder="Digite algo..."
      />

      <BotaoCustom
        cor="blue"
        texto="Adicionar"
        aoClicar={abrirModal}
      />

      <TabelaCustom dados={listaItens} />

      <ModalCustom
        aberto={modalAberto}
        BotaoConfirmacao="Confirmar"
        BotaoCancelar="Cancelar"
        aoConfirmar={confirmarAcao}
        aoCancelar={cancelarAcao}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
});