import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors} from '../../../services/utilities/Colors';
import {appIcons, appImages} from '../../../services/utilities/Assets';
import {scale} from 'react-native-size-matters';
import {AppStyles} from '../../../services/utilities/AppStyle';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';

const Login = ({navigation}) => {
  const SignUp = () => {
    navigation.navigate('SignUp');
  };

  const Login = () => {
    navigation.navigate('App');
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
      <TouchableWithoutFeedback>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={[
            AppStyles.contentContainer,
            {backgroundColor: Colors.backgroud1, justifyContent:'center'},
          ]}
          keyboardShouldPersistTaps="handled">
          <View style={styles.logoContainer}>
            <Text style={[AppStyles.loginText, {fontSize: fontSize.h3,fontWeight: 'bold',}]}>
              LOGIN
            </Text>
          </View>
          <View style={styles.fieldContainer}>
            <View style={styles.field}>
              <InputField lebal="Email" type="email-address" />
            </View>
            <View style={{marginTop: responsiveHeight(1)}}>
              <InputField
                lebal="Password"
                type="default"
                secureTextEntry={true}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              text={'Log In'}
              background={Colors.button1}
              fontWeight={'900'}
              onPress={Login}
            />
            <Button onPress={SignUp} text={'Sign Up'} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  logo: {
    width: scale(230),
    height: scale(40),
    marginBottom: responsiveHeight(2),
    marginTop: responsiveHeight(9),
  },
  logoContainer: {
    alignItems: 'center',
  },

  fieldContainer: {
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    marginTop: responsiveHeight(3),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  fbContainer: {
    width: responsiveWidth(32),
    height: responsiveHeight(5),
    backgroundColor: Colors.fbBackground,
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
  },
  facebook: {
    width: scale(25),
    height: scale(25),
  },

  field: {
    marginTop: responsiveHeight(1),
  },
});
