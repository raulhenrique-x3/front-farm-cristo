import React from "react";
import { View, StyleSheet, Text } from 'react-native';
import { Avatar, Button } from 'react-native-elements';

function Profile() {
  const getAvatarIcon = (thing: any) => {
    if (thing === 'idoso') {
      return 'human-cane';
    } else if (thing === 'doador') {
      return 'hand-heart';
    } else {
      return 'gray';
    }
  };

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        // icon={{ name: getAvatarIcon(category), type: 'material-community' }}
        containerStyle={styles.avatar}
        size="xlarge"
      />

      {/* <View style={styles.card}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.infoText}>Nascimento: {birth}</Text>
        <Text style={styles.infoText}>Mãe: {mother}</Text>
        <Text style={styles.infoText}>CPF: {cpf}</Text>
        <Text style={styles.infoText}>Categoria: {category}</Text>
      </View> */}

      <Button
        title="Editar"
        // onPress={() => navigation.navigate('Editar Perfil')}
        buttonStyle={styles.button}
        titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
      />

      <Button
        title="Excluir"
        buttonStyle={styles.buttonRed}
        titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
      />
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  avatar: {
    backgroundColor: '#666666',
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 30,
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 4,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2CA8E8',
    width: 280,
    height: 48,
    borderRadius: 50,
    marginBottom: 10,
  },
  buttonRed: {
    backgroundColor: '#e8522c',
    width: 280,
    height: 48,
    borderRadius: 50,
  },
});