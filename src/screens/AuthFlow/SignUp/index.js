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
  import React, {useState, useEffect} from 'react';
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
  
  const SignUp = ({navigation}) => {
   const Home= () =>{
    navigation.navigate('App')
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
                />
                <InputField
                lebal="Name"
                type="default"
                />
                <InputField
                lebal="Password"
                type="default"
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
  