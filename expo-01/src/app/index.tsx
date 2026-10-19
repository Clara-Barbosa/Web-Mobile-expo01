import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../../assets/images/fotoclara.jpg")}
          style={styles.photo}
        />

        <Text style={styles.name}>Maria Clara de Oliveira Barbosa</Text>

        <Text style={styles.course}>Ciência da Computação</Text>

        <View style={styles.divider} />

        <Text style={styles.bio}>
          Sou Maria Clara de Oliveira Barbosa, estudante de Ciência da
          Computação e apaixonada por tecnologia, programação e desenvolvimento
          de software. Busco sempre aprender coisas novas e aprimorar meus
          conhecimentos por meio de projetos acadêmicos e experiências
          práticas. Além da tecnologia, adoro música, livros, filmes e séries, e
          também adoro cantar. Me considero dedicada e gosto de encarar novos
          desafios que me permitam aprender e evoluir.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#1e293b",
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
  },

  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 22,
  },

  name: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },

  course: {
    color: "#94a3b8",
    fontSize: 16,
    marginTop: 7,
    textAlign: "center",
  },

  divider: {
    width: 55,
    height: 3,
    backgroundColor: "#38bdf8",
    borderRadius: 2,
    marginVertical: 22,
  },

  bio: {
    color: "#e2e8f0",
    fontSize: 16,
    lineHeight: 25,
    textAlign: "center",
  },
});