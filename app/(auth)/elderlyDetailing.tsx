import { useDeleteUserMutation } from "@/features/user/hooks/useDeleteUserMutation";
import { useGetUserById } from "@/features/user/hooks/useGetUserById";
import { Feather } from "@expo/vector-icons";
import { Avatar, Button } from "@rneui/themed";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

function ElderlyDetailing() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { mutate: deleteUserMutation } = useDeleteUserMutation();
  const { data } = useGetUserById(id as string);

  const handleDelete = () => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir este usuário?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            deleteUserMutation(id as string, {
              onSuccess: () => {
                Alert.alert("Sucesso", "Usuário excluído com sucesso!");
                router.push("/(auth)/home");
              },
              onError: (error: any) => {
                Alert.alert("Erro", "Erro ao excluir usuário");
                console.error("Exclusão error:", error);
              },
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Detalhes do Idoso",
          headerRight: () => (
            <Feather
              name="trash-2"
              size={24}
              color="#ff0000"
              style={{ marginRight: 16 }}
              onPress={handleDelete}
            />
          ),
        }}
      />
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

          {/* <Button
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
          /> */}
        </View>
      </View>
    </>
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
