import { View, Text } from 'react-native'
import React from 'react'
import Home from '../../screens/AppFlow/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Units from '../../screens/AppFlow/Units';

const Stack = createNativeStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
       <Stack.Screen name='Home' component={Home} />
       <Stack.Screen name='Units' component={Units} />
    </Stack.Navigator>
  )
}

export default AppStack