import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormularioScreen from '../screens/FormularioScreen';
import ClimaScreen from '../screens/ClimaScreen';
import SobreScreen from '../screens/SobreScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator({ setLoggedIn }) {
  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair do aplicativo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('usuarioLogado');
            setLoggedIn(false);
          },
        },
      ]
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
            <Text style={{ color: '#FF3B30', fontSize: 14, fontWeight: 'bold' }}>
              Sair
            </Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen name="Formulário" component={FormularioScreen} />
      <Tab.Screen name="Clima" component={ClimaScreen} />
      <Tab.Screen name="Sobre" component={SobreScreen} />
    </Tab.Navigator>
  );
}
