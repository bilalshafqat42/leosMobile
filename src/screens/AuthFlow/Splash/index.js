import { View} from 'react-native'
import React, {useContext, useEffect, useState, useLayoutEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Splash = ({navigation}) => {
    
    useEffect(() => {
        const id = AsyncStorage.getItem("Token", async (error, data) => {
            if (data) {
                navigation.navigate('App')
            } else {
                console.log("data: ", data);
                navigation.navigate('Auth')
            }
          })
        console.log("User ID: ", id);
    }, []);
           
  return (
    <View>
      <Text>Leos International</Text>
    </View>
   
  )
}

export default Splash