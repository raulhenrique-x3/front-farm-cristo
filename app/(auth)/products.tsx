import { useGetAllProducts } from "@/features/products/hooks/useGetAllProducts";
import { Feather } from "@expo/vector-icons";
import { Avatar, Icon, SearchBar } from "@rneui/themed";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

function Products() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const { data, isLoading, isError, isRefetching } = useGetAllProducts();

  const filteredList = data?.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

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
    <View style={styles.card}>
      <Avatar
        rounded
        icon={{
          name: "package-variant",
          type: "material-community",
        }}
        containerStyle={{ backgroundColor: "#666" }}
        size="small"
      />
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
      <Icon
        name="chevron-right"
        type="feather"
        color="#ccc"
        // onPress={() => router.push(`/(auth)/product/${item.id}`)}
      />
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Produtos",
          headerRight: () => (
            <Feather
              name="plus"
              size={24}
              color="#000000"
              style={{ marginRight: 16 }}
              onPress={() => router.push("/(auth)/createProduct")}
            />
          ),
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={filteredList}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          ListHeaderComponent={
            <SearchBar
              placeholder="Pesquisar produtos..."
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
      </View>
    </>
  );
}

export default Products;

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
});
