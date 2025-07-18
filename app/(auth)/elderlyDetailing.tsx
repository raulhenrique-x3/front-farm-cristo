import { useGetUserById } from "@/features/user/hooks/useGetUserById";
import { Feather } from "@expo/vector-icons";
import { Avatar, Button } from "@rneui/themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

function ElderlyDetailing() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useGetUserById(id as string);

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        icon={{ name: "user", type: "feather" }}
        containerStyle={styles.avatar}
        size="xlarge"
      />
      <Text style={styles.name}>{data?.name}</Text>
      <Text style={styles.role}>{data?.cpf}</Text>
      <Text style={styles.role}>{data?.birthDate}</Text>
      <Text style={styles.role}>{data?.type}</Text>

      <View style={styles.buttonGroup}>
        <Button
          title="Editar perfil"
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
          title="Doar remédio"
          buttonStyle={styles.button}
          titleStyle={{ color: "#0089b3" }}
          onPress={() =>
            router.push({
              pathname: "/(auth)/donateMedicine",
              params: { elderlyId: data?.id },
            })
          }
          icon={
            <Feather
              name="plus-circle"
              size={18}
              color="#0089b3"
              style={styles.icon}
            />
          }
        />

        <Button
          title="Remover perfil"
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
      </View>
    </View>
  );
}

export default ElderlyDetailing;

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
    marginBottom: 8,
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
