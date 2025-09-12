import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//scr\pages

import NuevaFactura from './scr/pages/NuevaFactura';
//C:\FRONTEND\sige-vtas\facVtaSer\scr\pages\ListadoFacturas.jsx
import ListadoFacturas from './scr/pages/ListadoFacturas'
import login from './scr/pages/login'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="iniciar">
        <Stack.Screen name="iniciar" component={login} />
        <Stack.Screen name="ListadoFacturas" component={ListadoFacturas} />
        <Stack.Screen name="NuevaFactura" component={NuevaFactura} />
      </Stack.Navigator>
    </NavigationContainer>
  );w
};

export default App;