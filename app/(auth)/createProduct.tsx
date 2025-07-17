import { useCreateProductMutation } from "@/features/products/hooks/useCreateProduct";
import { Button } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type FormData = {
  name: string;
  quantity: number;
  category: string;
};

function CreateProduct() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      quantity: 0,
      category: "",
    },
  });

  const { mutate } = useCreateProductMutation();

  const createProduct = (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
      },
      onError: (error: any) => {
        Alert.alert("Erro", "Erro ao cadastrar produto");
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

        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.category && (
          <Text style={styles.error}>{errors.category.message}</Text>
        )}

        <Text style={styles.label}>Quantidade:</Text>
        <Controller
          control={control}
          name="quantity"
          rules={{ required: "Quantidade é obrigatória" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value?.toString()}
              onChangeText={(text) => onChange(Number(text))}
              keyboardType="numeric"
            />
          )}
        />
        {errors.quantity && (
          <Text style={styles.error}>{errors.quantity.message}</Text>
        )}
      </ScrollView>

      <Button
        title="Cadastrar"
        onPress={handleSubmit(createProduct)}
        buttonStyle={styles.button}
        titleStyle={{ fontWeight: "bold", fontSize: 16 }}
      />
    </View>
  );
}

export default CreateProduct;

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
