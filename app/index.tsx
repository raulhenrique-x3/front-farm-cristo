import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLoginMutation } from "@/features/auth/hooks/useLoginMutation";
import { Image } from "expo-image";
import { Redirect, useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
type FormData = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { isAuthenticated, loading } = useAuth();
  const route = useRouter();
  const {
    control,
    handleSubmit,
    // setValue,  Adicionado para setar valor padrão
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "raul@email.com",
      password: "password@123",
    },
  });

  const { mutate } = useLoginMutation();

  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    setLoginError("");

    mutate(data, {
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: (error: any) => {
        setIsLoading(false);
        if (error?.response?.status === 404) {
          setLoginError("E-mail ou senha incorretos.");
        } else {
          setLoginError("Erro ao fazer login. Tente novamente.");
        }
      },
    });
  };

  if (loading) return null;
  if (isAuthenticated) return <Redirect href="/home" />;

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logoAbrigo.jpeg")}
        style={styles.image}
      />

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
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        rules={{ required: "Senha é obrigatória" }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Senha"
              secureTextEntry={!showPassword}
              placeholderTextColor="#999"
              value={value}
              onChangeText={onChange}
            />
            <TouchableOpacity
              onPress={() => setShowPassword((prev) => !prev)}
              style={styles.toggleButton}
            >
              <Text style={{ color: "#000", fontSize: 14 }}>
                {showPassword ? "Ocultar" : "Mostrar"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      {loginError ? <Text style={styles.error}>{loginError}</Text> : null}

      <TouchableOpacity
        style={[styles.button, isLoading && { opacity: 0.5 }]}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonLow}
        onPress={() => route.push("/adminRegistry")}
      >
        <Text style={styles.buttonText}>Cadastrar Administrador</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.buttonLow}
        onPress={() => navigation.navigate("Recuperar Senha")}
      >
        <Text style={styles.buttonText}>Recuperar senha</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    justifyContent: "center",
    padding: 24,
    alignItems: "center",
  },
  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    alignSelf: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 8,
  },
  toggleButton: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  button: {
    width: "100%",
    backgroundColor: "#2CA8E8",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "#ff6b6b",
    marginBottom: 10,
    marginLeft: 4,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 40,
  },
  buttonLow: {
    width: 280,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: 8,
  },
});
