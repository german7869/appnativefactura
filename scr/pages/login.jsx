import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // o cualquier otra librería de íconos
import axiosInstance from '../utils/api'; // Asegúrate que la ruta sea correcta
const ClientAccess = ({ onAccessGranted, navigation }) => {
  
  
  const [usuario, setUsuarios] = useState([]);

  const [usuariologin, setUsuariologin] = useState('');

   const existeusuario = async (documento) => {
     try {
       const response = await axiosInstance.get(`/usuarios/usuarios_list/${documento}`);
       console.log('Respuesta API:', response.data);
       // Ajusta esta condición según la estructura real de la respuesta
       if (response.data && Object.keys(response.data).length > 0) {
         return true;
       }
       return false;
     } catch (err) {
       console.error('Error en existeusuario:', err);
       Alert.alert('Error', 'Error al verificar usuario');
       return false;
     }
   };

   const handleAccess = async () => {
     if (usuariologin.trim()) {
       const usuarioExiste = await existeusuario(usuariologin.trim());
       if (usuarioExiste) {
         Alert.alert('Éxito', `Bienvenido Usuario: ${usuariologin}`);
         navigation.navigate('ListadoFacturas');
       } else {
         Alert.alert('Error', `Usuario no encontrado. Por favor verifica el ID: ${usuariologin}`);
       }
     } else {
       Alert.alert('Error', 'Por favor ingresa un ID de cliente válido.');
     }
   };
   
  return (
    <View style={styles.container}>
      {/* Logo de la empresa */}
      <Image source={require('../../assets/logo.jpeg')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Identificarse</Text>
      <View style={styles.inputContainer}>
        <Icon name="email-outline" size={24} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Ingrese ID de cliente"
          value={usuariologin}
          onChangeText={setUsuariologin}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAccess}>
        <Icon name="login" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Acceder</Text>
      </TouchableOpacity>
      {/* Información de contacto */}
      <View style={styles.contactContainer}>
        <Text style={styles.contactTitle}>Contacto</Text>
        <Text style={styles.contactText}>Email: soporte@sige.com</Text>
        <Text style={styles.contactText}>Teléfono: +593 99 426 4981</Text>
        <Text style={[styles.contactText, styles.link]} onPress={() => Linking.openURL('https://www.sigecloud.com')}>
          www.sigecloud.com
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 60,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#333',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  contactContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#555',
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});
export default ClientAccess;