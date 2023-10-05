import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Navigation from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AuthProvider from './src/navigation/AuthProvider';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') SplashScreen.hide();
  }, []);
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
