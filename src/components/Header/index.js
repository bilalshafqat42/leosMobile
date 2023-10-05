import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../services/utilities/Colors';
import {appIcons} from '../../services/utilities/Assets';

const Header = props => {
  const optionimage = {
    ...styles.headerback,
    height: scale(25),
    width: scale(25),
    borderRadius: scale(100),
    padding: 0,
    marginRight: responsiveScreenWidth(5),
  };

  return (
    <View style={styles.header}>
      <View style={{width: '70%'}}>
        {props.Image && (
          <TouchableOpacity
            style={{marginLeft: responsiveScreenWidth(3)}}
            onPress={props.onPress}>
            <Image style={styles.headerback} source={appIcons.back} />
          </TouchableOpacity>
        )}
      </View>
      <View style={{width: '30%'}}>
        {props.options && (
          <TouchableOpacity
            style={{marginLeft: responsiveScreenWidth(7), marginTop: '30%'}}
            onPress={props.onPress}>
            <Text
              style={{
                color: 'white',
                fontSize: responsiveFontSize(2.0),
                fontWeight: 'normal',
                marginTop: responsiveScreenHeight(1.2),
              }}>
              Log Out
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: responsiveScreenHeight(10.5),
    backgroundColor: Colors.backgroud1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  headerWithImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerWithoutImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  headerback: {
    height: scale(25),
    width: scale(22),
    marginLeft: '5%',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  logo: {
    width: scale(140),
    height: scale(25),
    alignSelf: 'center',
  },
});
