import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Dado from "./Dado";

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);

  const [dadosJogador1, setDadosJogador1] = useState([1, 1]);
  const [dadosJogador2, setDadosJogador2] = useState([1, 1]);

  const [jogouJogador1, setJogouJogador1] = useState(false);
  const [jogouJogador2, setJogouJogador2] = useState(false);

  const [placarJogador1, setPlacarJogador1] = useState(0);
  const [placarJogador2, setPlacarJogador2] = useState(0);

  const [resultadoRodada, setResultadoRodada] = useState("");
  const [resultadoFinal, setResultadoFinal] = useState("");

  const [jogoFinalizado, setJogoFinalizado] = useState(false);

  function sortearDado() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function jogarJogador1() {
    const dado1 = sortearDado();
    const dado2 = sortearDado();

    setDadosJogador1([dado1, dado2]);

    setJogouJogador1(true);
    setJogouJogador2(false);

    setResultadoRodada("");
  }

  function jogarJogador2() {
    const dado1 = sortearDado();
    const dado2 = sortearDado();

    const novosDadosJogador2 = [dado1, dado2];

    setDadosJogador2(novosDadosJogador2);
    setJogouJogador2(true);

    const somaJogador1 = dadosJogador1[0] + dadosJogador1[1];
    const somaJogador2 =
      novosDadosJogador2[0] + novosDadosJogador2[1];

    let novoPlacarJogador1 = placarJogador1;
    let novoPlacarJogador2 = placarJogador2;

    if (somaJogador1 > somaJogador2) {
      novoPlacarJogador1 = placarJogador1 + 1;
      setPlacarJogador1(novoPlacarJogador1);
      setResultadoRodada("Jogador 1 venceu a rodada!");
    } else if (somaJogador2 > somaJogador1) {
      novoPlacarJogador2 = placarJogador2 + 1;
      setPlacarJogador2(novoPlacarJogador2);
      setResultadoRodada("Jogador 2 venceu a rodada!");
    } else {
      setResultadoRodada("Empate na rodada!");
    }

    if (rodada === 5) {
      finalizarJogo(novoPlacarJogador1, novoPlacarJogador2);
    }
  }

  function proximaRodada() {
    if (rodada >= 5) {
      return;
    }

    setRodada((rodadaAtual) => rodadaAtual + 1);

    setDadosJogador1([1, 1]);
    setDadosJogador2([1, 1]);

    setJogouJogador1(false);
    setJogouJogador2(false);

    setResultadoRodada("");
  }

  function finalizarJogo(totalJogador1: number, totalJogador2: number) {
    setJogoFinalizado(true);

    if (totalJogador1 > totalJogador2) {
      setResultadoFinal("Jogador 1 venceu o jogo!");
    } else if (totalJogador2 > totalJogador1) {
      setResultadoFinal("Jogador 2 venceu o jogo!");
    } else {
      setResultadoFinal("Empate geral!");
    }
  }

  function jogarNovamente() {
    setRodada(1);

    setDadosJogador1([1, 1]);
    setDadosJogador2([1, 1]);

    setJogouJogador1(false);
    setJogouJogador2(false);

    setPlacarJogador1(0);
    setPlacarJogador2(0);

    setResultadoRodada("");
    setResultadoFinal("");

    setJogoFinalizado(false);
  }

  const jogador1Desabilitado = jogouJogador1 || jogoFinalizado;

  const jogador2Desabilitado =
    !jogouJogador1 || jogouJogador2 || jogoFinalizado;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.titulo}>Jogo de Dados</Text>

        <Text style={styles.rodada}>
          Rodada {rodada} / 5
        </Text>
      </View>

      <View style={styles.jogadores}>
        <View style={styles.jogadorCard}>
          <Text style={styles.jogadorTitulo}>Jogador 1</Text>

          <View style={styles.dadosArea}>
            <Dado valor={dadosJogador1[0]} />
            <Dado valor={dadosJogador1[1]} />
          </View>

          <Text style={styles.soma}>
            Soma:{" "}
            {jogouJogador1
              ? dadosJogador1[0] + dadosJogador1[1]
              : "-"}
          </Text>

          <Pressable
            style={[
              styles.botaoJogar,
              jogador1Desabilitado && styles.botaoDesabilitado,
            ]}
            onPress={jogarJogador1}
            disabled={jogador1Desabilitado}
          >
            <Text style={styles.botaoTexto}>Jogar</Text>
          </Pressable>
        </View>

        <View style={styles.jogadorCard}>
          <Text style={styles.jogadorTitulo}>Jogador 2</Text>

          <View style={styles.dadosArea}>
            <Dado valor={dadosJogador2[0]} />
            <Dado valor={dadosJogador2[1]} />
          </View>

          <Text style={styles.soma}>
            Soma:{" "}
            {jogouJogador2
              ? dadosJogador2[0] + dadosJogador2[1]
              : "-"}
          </Text>

          <Pressable
            style={[
              styles.botaoJogar,
              jogador2Desabilitado && styles.botaoDesabilitado,
            ]}
            onPress={jogarJogador2}
            disabled={jogador2Desabilitado}
          >
            <Text style={styles.botaoTexto}>Jogar</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.placarCard}>
        <Text style={styles.placarTitulo}>Placar</Text>

        <View style={styles.placarValores}>
          <View style={styles.placarJogador}>
            <Text style={styles.placarNome}>Jogador 1</Text>
            <Text style={styles.placarNumero}>{placarJogador1}</Text>
          </View>

          <View style={styles.placarJogador}>
            <Text style={styles.placarNome}>Jogador 2</Text>
            <Text style={styles.placarNumero}>{placarJogador2}</Text>
          </View>
        </View>
      </View>

      {resultadoRodada !== "" && (
        <View style={styles.resultado}>
          <Text style={styles.resultadoTitulo}>
            Resultado da rodada
          </Text>

          <Text style={styles.resultadoTexto}>
            {resultadoRodada}
          </Text>
        </View>
      )}

      {!jogoFinalizado &&
        jogouJogador1 &&
        jogouJogador2 &&
        rodada < 5 && (
          <Pressable
            style={styles.botaoProxima}
            onPress={proximaRodada}
          >
            <Text style={styles.botaoTexto}>Próxima Rodada</Text>
          </Pressable>
        )}

      {jogoFinalizado && (
        <View style={styles.resultadoFinal}>
          <Text style={styles.resultadoFinalTitulo}>
            Resultado Final
          </Text>

          <Text style={styles.resultadoFinalTexto}>
            {resultadoFinal}
          </Text>

          <Pressable
            style={styles.botaoNovamente}
            onPress={jogarNovamente}
          >
            <Text style={styles.botaoTexto}>Jogar Novamente</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f1f5f9",
    padding: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },

  topo: {
    alignItems: "center",
    marginBottom: 24,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0f172a",
  },

  rodada: {
    marginTop: 8,
    fontSize: 17,
    color: "#475569",
  },

  jogadores: {
    gap: 18,
  },

  jogadorCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
  },

  jogadorTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 18,
  },

  dadosArea: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },

  soma: {
    fontSize: 18,
    fontWeight: "600",
    color: "#334155",
    marginTop: 18,
    marginBottom: 16,
  },

  botaoJogar: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 10,
  },

  botaoDesabilitado: {
    backgroundColor: "#94a3b8",
  },

  botaoTexto: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  placarCard: {
    backgroundColor: "#0f172a",
    borderRadius: 18,
    padding: 20,
    marginTop: 20,
  },

  placarTitulo: {
    color: "#ffffff",
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },

  placarValores: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  placarJogador: {
    alignItems: "center",
  },

  placarNome: {
    color: "#cbd5e1",
    fontSize: 15,
  },

  placarNumero: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 5,
  },

  resultado: {
    backgroundColor: "#dbeafe",
    borderRadius: 14,
    padding: 18,
    marginTop: 20,
    alignItems: "center",
  },

  resultadoTitulo: {
    color: "#1e3a8a",
    fontSize: 17,
    fontWeight: "bold",
  },

  resultadoTexto: {
    color: "#1e40af",
    fontSize: 16,
    marginTop: 6,
  },

  botaoProxima: {
    backgroundColor: "#16a34a",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
  },

  resultadoFinal: {
    backgroundColor: "#fef3c7",
    borderRadius: 18,
    padding: 22,
    marginTop: 20,
    alignItems: "center",
  },

  resultadoFinalTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#92400e",
  },

  resultadoFinalTexto: {
    fontSize: 18,
    color: "#78350f",
    marginVertical: 14,
  },

  botaoNovamente: {
    backgroundColor: "#ea580c",
    paddingVertical: 13,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
});