import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './auth';
import AppStack from './app';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{headerShown: false}}>
        <Stack.Screen name='Auth' component={AuthStack} />
        <Stack.Screen name='App' component={AppStack} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation