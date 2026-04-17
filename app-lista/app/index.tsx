import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import InputCustom from "../components/InputCustom";
import BotaoCustom from "../components/BotaoCustom";
import TabelaCustom from "../components/TabelaCustom";
import ModalCustom from "../components/ModalCustom";

export default function Index() {
  // estado do input
  const [valorInput, setValorInput] = useState("");

  // lista de itens adicionados
  const [listaItens, setListaItens] = useState<string[]>([]);

  // controla se o modal está aberto
  const [modalAberto, setModalAberto] = useState(false);

  // abre o modal apenas se tiver algo digitado
  function abrirModal() {
    if (valorInput !== "") {
      setModalAberto(true);
    }
  }

  // adiciona item na lista
  function confirmarAcao() {
    setListaItens([...listaItens, valorInput]); // adiciona novo item
    setValorInput(""); // limpa input
    setModalAberto(false); // fecha modal
  }

  // fecha o modal sem fazer nada
  function cancelarAcao() {
    setModalAberto(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* campo de texto */}
      <InputCustom
        valor={valorInput}
        aoMudar={setValorInput}
        placeholder="Digite algo..."
      />

      {/* botão para abrir modal */}
      <BotaoCustom
        cor="blue"
        texto="Adicionar"
        aoClicar={abrirModal}
      />

      {/* lista de itens */}
      <TabelaCustom dados={listaItens} />

      {/* modal de confirmação */}
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