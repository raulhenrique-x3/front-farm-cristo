import { useAuth } from "@/features/auth/hooks/useAuth";
import { Feather } from "@expo/vector-icons";
import { Avatar, Button } from "@rneui/themed";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Profile() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        icon={{ name: "user", type: "feather" }}
        containerStyle={styles.avatar}
        size="xlarge"
      />
      <Text style={styles.name}>Nome do Usuário</Text>
      <Text style={styles.role}>Categoria: Idoso</Text>

      <View style={styles.buttonGroup}>
        <Button
          title="Editar Perfil"
          buttonStyle={styles.button}
          titleStyle={{ color: "#000000" }}
          icon={
            <Feather
              name="edit-2"
              size={18}
              color="#000000"
              style={styles.icon}
            />
          }
        />

        <Button
          title="Excluir Conta"
          buttonStyle={styles.buttonRed}
          icon={
            <Feather
              name="trash-2"
              size={18}
              color="#fff"
              style={styles.icon}
            />
          }
        />

        <Button
          title="Sair"
          type="outline"
          buttonStyle={styles.buttonLogout}
          titleStyle={{ color: "#2CA8E8" }}
          icon={
            <Feather
              name="log-out"
              size={18}
              color="#2CA8E8"
              style={styles.icon}
            />
          }
          onPress={handleLogout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  avatar: {
    backgroundColor: "#2CA8E8",
    marginBottom: 16,
    elevation: 6,
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    color: "#222",
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: "#777",
    marginBottom: 32,
  },
  buttonGroup: {
    width: "100%",
    gap: 12,
  },
  button: {
    backgroundColor: "transparent",
    borderColor: "#000000",
    borderWidth: 1.5,
    borderRadius: 50,
    height: 48,
    justifyContent: "center",
  },
  buttonRed: {
    backgroundColor: "#e8522c",
    borderRadius: 50,
    height: 48,
    justifyContent: "center",
  },
  buttonLogout: {
    borderColor: "#2CA8E8",
    borderWidth: 1.5,
    borderRadius: 50,
    height: 48,
    justifyContent: "center",
  },
  icon: {
    marginRight: 10,
  },
});
