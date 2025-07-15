import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Historico() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Histórico de Movimentações</Text>
      <View style={styles.card}>
        <Text>Movimentação 1</Text>
        <Text>Data: 01/01/2023</Text>
        <Text>Descrição: Compra de medicamentos</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2CA8E8",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
});
