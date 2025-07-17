import { useGetAllUsers } from "@/features/user/hooks/useGetAllUsers";
import { Avatar, Icon, SearchBar } from "@rneui/themed";
import { useRouter } from "expo-router";
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

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const route = useRouter();
  const { data, isLoading, isError, isRefetching } = useGetAllUsers();

  const filteredList = data?.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const getAvatarIcon = (thing: any) => {
    if (thing === "idoso") {
      return "human-cane";
    } else if (thing === "doador") {
      return "hand-heart";
    } else {
      return "gray";
    }
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
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Avatar
        rounded
        icon={{
          name: getAvatarIcon(item.category),
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
        onPress={() => route.push("/(auth)/profile")}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredList}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListHeaderComponent={
          <SearchBar
            placeholder="Pesquisar..."
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

      <View style={styles.bottomBar}>
        <Icon
          name="home"
          type="feather"
          color="#fff"
          onPress={() => route.push("/home")}
        />
        <Icon
          name="box"
          type="feather"
          color="#fff"
          onPress={() => route.push("/(auth)/home")}
        />
        <Icon
          name="log-out"
          type="feather"
          color="#fff"
          onPress={async () => {
            route.push("/");
          }}
        />
      </View>
    </View>
  );
}

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
