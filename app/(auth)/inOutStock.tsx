// import { Text, StyleSheet, Alert, View, ScrollView } from 'react-native';
// import { Input, Button, ListItem } from 'react-native-elements';
// import { useState } from 'react';
// import axios from 'axios';
// import { list as userList } from './home'; // temporário, passar um axios.get com URL depois

// export default function EntradaSaida({ route, navigation }) {
//     const { tipo, item } = route.params;
//     const [quantidade, setQuantidade] = useState('');
//     const [pessoaSelecionada, setPessoaSelecionada] = useState(null);

//     const usuariosFiltrados = userList.filter(u =>
//         tipo === 'entrada' ? u.category === 'doador' : u.category === 'idoso'
//     );

//     const handleRegistrar = async () => {
//         if (!quantidade || !pessoaSelecionada) {
//             Alert.alert('Erro', 'Preencha todos os campos');
//             return;
//         }

//         try {
//             await axios.post('http://localhost:8000/', { //esperar a URL
//                 tipo,
//                 itemId: item.id,
//                 quantidade: parseInt(quantidade),
//                 pessoaId: pessoaSelecionada.id
//             });

//             Alert.alert('Sucesso', `${tipo === 'entrada' ? 'Entrada' : 'Saída'} registrada!`);
//             navigation.goBack();
//         } catch (error) {
//             console.error(error);
//             Alert.alert('Erro', 'Não foi possível registrar.');
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>{tipo === 'entrada' ? 'Registrar Entrada' : 'Registrar Saída'}</Text>

//             <Text style={styles.label}>Quantidade:</Text>
//             <Input value={quantidade} onChangeText={setQuantidade} keyboardType="numeric" style={styles.input} inputContainerStyle={{ borderBottomWidth: 0 }} />

//             <Text style={styles.label}>
//                 {tipo === 'entrada' ? 'Selecione o Doador:' : 'Selecione o Idoso:'}
//             </Text>

//             <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
//                 {usuariosFiltrados.map((pessoa) => (
//                     <ListItem
//                         key={pessoa.id}
//                         containerStyle={[
//                             styles.listItem,
//                             pessoaSelecionada?.id === pessoa.id && styles.listItemSelected,
//                         ]}
//                         onPress={() => setPessoaSelecionada(pessoa)}
//                     >
//                         <ListItem.Content>
//                             <ListItem.Title style={styles.listItemTitle}>{pessoa.name}</ListItem.Title>
//                         </ListItem.Content>
//                         {pessoaSelecionada?.id === pessoa.id && <Text style={styles.checkIcon}>✔</Text>}
//                     </ListItem>
//                 ))}
//             </ScrollView>


//             <Button
//                 title="Confirmar"
//                 onPress={handleRegistrar}
//                 buttonStyle={styles.button}
//                 titleStyle={{ fontWeight: 'bold', fontSize: 16 }} />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F7F7F7',
//         padding: 20,
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         color: '#2CA8E8',
//     },
//     label: {
//         alignSelf: 'flex-start',
//         margin: 10,
//         fontSize: 15,
//         fontWeight: '500',
//         color: '#2CA8E8',
//     },
//     button: {
//         backgroundColor: '#2CA8E8',
//         width: 280,
//         height: 48,
//         borderRadius: 50,
//         marginBottom: 20,
//         alignSelf: 'center',
//     },
//     input: {
//         backgroundColor: "#fff",
//         color: "black",
//         width: 320,
//         height: 48,
//         borderRadius: 50,
//         padding: 10,
//         paddingHorizontal: 16,
//         paddingVertical: 12,
//         borderWidth: 2,
//         borderColor: "#7ac4e9",

//         // Sombras para iOS
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,

//         // Sombra para Android
//         elevation: 4,
//     },
//     scrollContainer: {
//         maxHeight: 250, // limite visual opcional
//         marginBottom: 20,
//     },

//     scrollContent: {
//         paddingBottom: 10,
//     },

//     listItem: {
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         marginVertical: 5,
//         marginHorizontal: 5,

//         // Sombras
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//     },

//     listItemSelected: {
//         borderWidth: 2,
//         borderColor: '#2CA8E8',
//     },

//     listItemTitle: {
//         fontSize: 16,
//         color: '#333',
//         fontWeight: '600',
//     },

//     checkIcon: {
//         fontSize: 18,
//         color: '#2CA8E8',
//         fontWeight: 'bold',
//     },
// });