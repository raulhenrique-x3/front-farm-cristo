import { Avatar, Icon, SearchBar } from "@rneui/themed";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

// ESTA LISTA ESTÁ AQUI TEMPORARIAMENTE PARA FINS DE TESTE, ATÉ QUE SEJA FEITA A REQUISIÇÃO PRO BACK-END COM A VERDADEIRA LISTA DE IDOSOS //

export const list = [
  {
    id: 1,
    name: "João Silva",
    nascimento: "1990-08-25",
    cpf: "112.233.445-66",
    categoria: "doador",
    mae: "Ana Silva",
  },
  {
    id: 2,
    name: "Ana Oliveira",
    nascimento: "1988-05-12",
    cpf: "223.344.556-77",
    categoria: "idoso",
    mae: "Sônia Oliveira",
  },
  {
    id: 3,
    name: "Carlos Souza",
    nascimento: "1995-02-10",
    cpf: "334.455.667-88",
    categoria: "idoso",
    mae: "Tereza Souza",
  },
  {
    id: 4,
    name: "Fernanda Costa",
    nascimento: "1992-09-15",
    cpf: "445.566.778-99",
    categoria: "doador",
    mae: "Mariana Costa",
  },
  {
    id: 5,
    name: "Roberto Pereira",
    nascimento: "1983-11-05",
    cpf: "556.677.889-00",
    categoria: "idoso",
    mae: "Luciana Pereira",
  },
  {
    id: 6,
    name: "Jorge Silva",
    nascimento: "1990-08-25",
    cpf: "112.233.445-66",
    categoria: "doador",
    mae: "Ana Silva",
  },
  {
    id: 7,
    name: "Patricia Oliveira",
    nascimento: "1988-05-12",
    cpf: "223.344.556-77",
    categoria: "doador",
    mae: "Sônia Oliveira",
  },
  {
    id: 8,
    name: "Mario Souza",
    nascimento: "1995-02-10",
    cpf: "334.455.667-88",
    categoria: "idoso",
    mae: "Tereza Souza",
  },
  {
    id: 9,
    name: "Talita Costa",
    nascimento: "1992-09-15",
    cpf: "445.566.778-99",
    categoria: "idoso",
    mae: "Mariana Costa",
  },
  {
    id: 10,
    name: "Claudia Pereira",
    nascimento: "1983-11-05",
    cpf: "556.677.889-00",
    categoria: "idoso",
    mae: "Luciana Pereira",
  },
];

// EXCLUIR ESTA LISTA ASSIM QUE A CONEXÃO COM O BACK-END ESTIVER ATIVA //

export default function HomeScreen() {
  const route = useRouter();

  const [search, setSearch] = useState("");
  const [data, setData] = useState(list);

  const filteredList = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  /* useEffect(() => {
     const checkAuth = async () => {
       const token = await AsyncStorage.getItem('token');
       if (!token) {
         Alert.alert('Sessão expirada', 'Você precisa fazer login novamente.');
         navigation.replace('Login');
       }
     };
 
     checkAuth();
   }, []); */

  const getAvatarIcon = (thing: any) => {
    if (thing === "idoso") {
      return "human-cane";
    } else if (thing === "doador") {
      return "hand-heart";
    } else {
      return "gray";
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Avatar
        rounded
        icon={{
          name: getAvatarIcon(item.categoria),
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
      <ScrollView>
        <SearchBar
          placeholder="Pesquisar..."
          onChangeText={setSearch}
          value={search}
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInput}
          lightTheme
          round
        />

        <FlatList
          data={filteredList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 25 }}
        />
      </ScrollView>

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
});
