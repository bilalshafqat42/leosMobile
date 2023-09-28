import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './AuthProvider';
import auth from '@react-native-firebase/auth';
import AppStack from './app';
import AuthStack from './auth';


const Navigation = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(false);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <AppStack/> :
        <AuthStack />
  }
    </NavigationContainer>
  );
};

export default Navigation;
