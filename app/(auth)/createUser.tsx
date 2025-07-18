import { useCreateUserMutation } from "@/features/user/hooks/useCreateUserMutation";
import { Button } from "@rneui/themed";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type FormData = {
  name: string;
  birthDate: string;
  cpf: string;
  type: "elderly" | "donor";
};

export default function CreateUser() {
  const [type, setType] = useState<"elderly" | "donor">("elderly");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      birthDate: "",
      type: type,
      cpf: "",
    },
  });

  const { mutate } = useCreateUserMutation();

  const createUser = (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      },
      onError: (error: any) => {
        Alert.alert("Erro", "Erro ao cadastrar usuário");
        console.error("Cadastro error:", error);
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nome:</Text>
        <Controller
          control={control}
          name="name"
          rules={{ required: "Nome é obrigatório" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

        <Text style={styles.label}>Categoria:</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              type === "elderly" && styles.radioSelected,
            ]}
            onPress={() => setType("elderly")}
          >
            <Text
              style={[
                styles.radioText,
                type === "elderly" && { color: "#fff" },
              ]}
            >
              Idoso
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.radioButton,
              type === "donor" && styles.radioSelected,
            ]}
            onPress={() => setType("donor")}
          >
            <Text
              style={[styles.radioText, type === "donor" && { color: "#fff" }]}
            >
              Doador
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Data de nascimento:</Text>
        <Controller
          control={control}
          name="birthDate"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.birthDate && (
          <Text style={styles.error}>{errors.birthDate.message}</Text>
        )}

        <Text style={styles.label}>CPF:</Text>
        <Controller
          control={control}
          name="cpf"
          rules={{
            required: "CPF é obrigatório",
            pattern: {
              value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
              message: "CPF inválido",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.cpf && <Text style={styles.error}>{errors.cpf.message}</Text>}
      </ScrollView>

      <Button
        title="Cadastrar"
        onPress={handleSubmit(createUser)}
        buttonStyle={styles.button}
        titleStyle={{ fontWeight: "bold", fontSize: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    backgroundColor: "#fff",
    color: "black",
    width: 320,
    height: 48,
    borderRadius: 50,
    padding: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#000000",
    // Sombras para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Sombra para Android
    elevation: 4,
  },
  button: {
    backgroundColor: "#000000",
    width: 280,
    height: 48,
    borderRadius: 50,
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    margin: 10,
    fontSize: 15,
    fontWeight: "500",
    color: "#000000",
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  radioButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 20,
    width: 100,
    alignItems: "center",
  },
  radioText: {
    color: "#000000",
  },
  radioSelected: {
    color: "#fff",
    backgroundColor: "#000000",
  },
  error: {
    color: "#ff6b6b",
    fontSize: 13,
    marginLeft: 12,
    marginTop: -8,
    marginBottom: 8,
  },
});
