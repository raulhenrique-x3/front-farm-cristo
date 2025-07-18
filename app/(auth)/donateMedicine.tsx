import { useDonateMedicineMutation } from "@/features/elderly/hooks/useDonateMedicineMutation";
import { useGetProductsByCategory } from "@/features/products/hooks/useGetProductsByCategory";
import { Avatar, Icon, SearchBar } from "@rneui/themed";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

function DonateMedicine() {
  const [search, setSearch] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);
  const [donationQuantity, setDonationQuantity] = useState("");
  const { elderlyId } = useLocalSearchParams<{ elderlyId: string }>();

  const { data, isLoading, isError, isRefetching } =
    useGetProductsByCategory("Remédio");

  const filteredList = data?.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const { mutate } = useDonateMedicineMutation();

  const handleDonateMedicine = (medicine: any) => {
    setSelectedMedicine(medicine);
    setDonationQuantity("");
    setModalVisible(true);
  };

  if (isLoading || isRefetching) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (isError) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color={"#f00000"} />
          <Text>Erro ao carregar produtos...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleDonateMedicine(item)}
    >
      <Avatar
        rounded
        icon={{ name: "package-variant", type: "material-community" }}
        containerStyle={{ backgroundColor: "#666" }}
        size="small"
      />
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={{ color: "#666" }}>
          {item.quantity} unidades - {item.category}
        </Text>
      </View>
      <Icon name="chevron-right" type="feather" color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredList}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListHeaderComponent={
          <SearchBar
            placeholder="Pesquisar remédios..."
            onChangeText={setSearch}
            value={search}
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInput}
            lightTheme
            round
          />
        }
        contentContainerStyle={{ paddingBottom: 25 }}
      />
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmar Doação</Text>
            <Text style={styles.modalText}>
              Remédio: {selectedMedicine?.name}
            </Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              placeholder="Quantidade a doar"
              value={donationQuantity}
              onChangeText={setDonationQuantity}
            />
            <View style={styles.modalButtons}>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#2CA8E8" }]}
                  onPress={() => {
                    mutate({
                      elderlyId,
                      medicineId: selectedMedicine?.id,
                      quantity: Number(donationQuantity),
                    });
                    setModalVisible(false);
                  }}
                >
                  <Text style={{ color: "#fff" }}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default DonateMedicine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 7,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: "#2CA8E8",
    width: "100%",
    height: 64,
  },
  searchContainer: {
    backgroundColor: "#F7F7F7",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    flex: 1,
    marginLeft: 10,
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 20,
    height: 35,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalInput: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
});
