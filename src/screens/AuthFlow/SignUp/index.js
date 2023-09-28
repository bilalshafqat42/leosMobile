import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    ScrollView,
    TouchableOpacity,
    Image
  } from 'react-native';
  import React, {useState, useEffect, useContext} from 'react';
  import {scale} from 'react-native-size-matters';
  import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from 'react-native-responsive-dimensions';
import { Colors } from '../../../services/utilities/Colors';
import { AppStyles } from '../../../services/utilities/AppStyle';
import InputField from '../../../components/InputField';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import { fontSize } from '../../../services/utilities/Fonts';
import { AuthContext } from '../../../navigation/AuthProvider';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

  
  const SignUp = ({navigation}) => {
    const {register, user} = useContext(AuthContext);
    const isValidEmail = email => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    };
  
    const isValidPassword = password => {
      return password.length >= 8;
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
   const Home= () =>{
    if (!isValidEmail(email)) {
      throw new Error('Invalid email address');
    }

    if (!isValidPassword(password)) {
      throw new Error('Password must have at least 8 characters');
    }

   
    
      register(email, password)
  //       .then((user) => {
         
  //         if (user) {
  //          navigation.navigate('App')
  //         } else {
  //           Toast.show('Registration failed', Toast.LONG);
  //         }
  //       })
  //       .catch((error) => {
         
  //         console.error(error);
  //         Toast.show('Registration error', Toast.LONG);
  //       });
    
  // } catch (error) {
  //   Toast.show(error.message, Toast.LONG);
  // }
  }
    const back = () =>{

      navigation.goBack()
    }
    return (
      <>
        <Header Image={true} onPress= {back}/>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
          <TouchableWithoutFeedback>
            <ScrollView
              style={{flex: 1}}
              contentContainerStyle={[AppStyles.contentContainer,{ backgroundColor:Colors.backgroud1}]}
              keyboardShouldPersistTaps="handled">
                <View style={{marginTop: '10%',}}> 
                <Text style={[AppStyles.loginText, {fontSize: fontSize.h3,fontWeight: 'bold',alignSelf:'center'}]}>
              Sign Up
            </Text>
               
                <InputField
                lebal="Email"
                type="email-address"
                onChangeText={setEmail}
                value={email}
                />
                <InputField
                lebal="Name"
                type="default"
                onChangeText={setName}
                value={name}
                />
                <InputField
                lebal="Password"
                type="default"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
                />
                {/* <View style={styles.toggleContainer}>
                  <TouchableOpacity onPress={toggleCheck} style={styles.toggle}>
                    { isChecked &&
                    <Image style={styles.tick} source={appIcons.tick} />
                    }
                    </TouchableOpacity>
                  <View style={{marginTop:responsiveHeight(-1),marginLeft: responsiveWidth(5)}}>
                    <Text style={styles.text}>By Logging in, you agree to the</Text>
                    <View style={{flexDirection:'row',}}>
                    <TouchableOpacity>
                    <Text style={[styles.text,{color:Colors.forgot}]}>Terms os service</Text>
                    </TouchableOpacity>
                    <Text style={styles.text}>{' '}and{' '}</Text>
                    <TouchableOpacity>
                    <Text style={[styles.text,{color:Colors.forgot}]}>Privacy Policy</Text>
                    </TouchableOpacity>
                    </View>
                  </View>
  
                </View> */}
                <View style={[AppStyles.button,{marginTop:'10%'}]}>
                <Button
                onPress={Home}
            background={Colors.button1} 
            text="Create Account"
            
          />
          </View>
                </View>
              </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </>
    );
  };
  
  export default SignUp;
  
  const styles = StyleSheet.create({
    toggleContainer:{
      flexDirection: 'row',
      marginVertical: responsiveHeight(5),
    },
    toggle:{
      width: scale(21),
      height: scale(21),
      borderRadius: 5,
      backgroundColor:Colors.fieldBackground,
      marginLeft: responsiveWidth(10),
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
      color: Colors.toggleText,
      fontSize: fontSize.lebal
    },
    tick : {
      width: responsiveWidth(5),
      height: responsiveWidth(5),
    }
  });
  