import { useAdminRegisterMutation } from "@/features/auth/hooks/useAdminRegisterMutation";
import { Button } from "@rneui/themed";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function AdminRegistry() {
  const route = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate } = useAdminRegisterMutation();

  const salvarAdmin = (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        // route.push("/home");
      },
      onError: (error: any) => {
        console.error("Erro ao cadastrar administrador:", error);
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nome do farmacêutico:</Text>
        <Controller
          control={control}
          name="name"
          rules={{ required: "Nome é obrigatório" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              placeholder="Digite o nome"
            />
          )}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

        <Text style={styles.label}>E-mail do farmacêutico:</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "E-mail é obrigatório",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "E-mail inválido",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              placeholder="Digite o e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}

        <Text style={styles.label}>CRF do farmacêutico:</Text>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Senha é obrigatória" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              placeholder="Digite a senha"
            />
          )}
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}
      </ScrollView>

      <Button
        title="Cadastrar"
        buttonStyle={styles.button}
        onPress={handleSubmit(salvarAdmin)}
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
    borderWidth: 2,
    borderColor: "#7ac4e9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    backgroundColor: "#2CA8E8",
    width: 280,
    height: 48,
    borderRadius: 50,
    marginBottom: 20,
    marginTop: 10,
  },
  label: {
    alignSelf: "flex-start",
    margin: 10,
    fontSize: 15,
    fontWeight: "500",
    color: "#2CA8E8",
  },
  error: {
    color: "#ff6b6b",
    fontSize: 13,
    marginLeft: 12,
    marginTop: -8,
    marginBottom: 8,
  },
});
