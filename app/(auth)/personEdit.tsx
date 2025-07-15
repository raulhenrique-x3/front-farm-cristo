import { Button } from "@rneui/themed";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type FormData = {
  nome: string;
  dataNasc: string;
  nomeMae: string;
  cpf: string;
  categoria: string;
};

export default function PersonEdit() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("null");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nome: "",
      dataNasc: "",
      nomeMae: "",
      cpf: "",
      categoria: "null",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Dados enviados:", data);
  };

  const handleCategoria = (categoria: string) => {
    setCategoriaSelecionada(categoria);
    setValue("categoria", categoria);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Editar nome:</Text>
        <Controller
          control={control}
          name="nome"
          rules={{ required: "Nome é obrigatório" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.nome && <Text style={styles.error}>{errors.nome.message}</Text>}

        <Text style={styles.label}>Editar categoria:</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              categoriaSelecionada === "idoso" && styles.radioSelected,
            ]}
            onPress={() => handleCategoria("idoso")}
          >
            <Text
              style={[
                styles.radioText,
                categoriaSelecionada === "idoso" && { color: "#fff" },
              ]}
            >
              Idoso
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.radioButton,
              categoriaSelecionada === "doador" && styles.radioSelected,
            ]}
            onPress={() => handleCategoria("doador")}
          >
            <Text
              style={[
                styles.radioText,
                categoriaSelecionada === "doador" && { color: "#fff" },
              ]}
            >
              Doador
            </Text>
          </TouchableOpacity>
        </View>

        <Controller control={control} name="categoria" render={() => <></>} />

        <Text style={styles.label}>Editar data de nascimento:</Text>
        <Controller
          control={control}
          name="dataNasc"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Text style={styles.label}>Editar nome da mãe:</Text>
        <Controller
          control={control}
          name="nomeMae"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Text style={styles.label}>Editar CPF:</Text>
        <Controller
          control={control}
          name="cpf"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </ScrollView>

      <Button
        title="Salvar"
        onPress={handleSubmit(onSubmit)}
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
    borderWidth: 2,
    borderColor: "#7ac4e9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#2CA8E8",
    width: 280,
    height: 48,
    borderRadius: 50,
    marginBottom: 20,
    marginTop: 12,
  },
  label: {
    alignSelf: "flex-start",
    margin: 10,
    fontSize: 15,
    fontWeight: "500",
    color: "#2CA8E8",
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  radioButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#2CA8E8",
    borderRadius: 20,
    width: 100,
    alignItems: "center",
  },
  radioText: {
    color: "#2CA8E8",
  },
  radioSelected: {
    color: "#fff",
    backgroundColor: "#2CA8E8",
  },
  error: {
    color: "#ff6b6b",
    marginBottom: 4,
    marginLeft: 12,
  },
});
