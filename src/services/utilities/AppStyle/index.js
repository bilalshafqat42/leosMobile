import { StyleSheet, Text, View } from 'react-native'
import { fontFamily, fontSize } from '../Fonts'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { Colors } from '../Colors'
import { scale } from 'react-native-size-matters'

export const AppStyles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        backgroundColor: Colors.backgroud1
      },
      button:{
        alignItems:'center',
        justifyContent:'center'
      },
      text: {
        color: Colors.lebal,
        fontSize: fontSize.h1,
        marginTop: responsiveHeight(2),
      },
      loginText: {
        color: Colors.loginText,
        fontSize: fontSize.h1,
        marginTop: responsiveHeight(2),
      },
      forgot : {
        color: Colors.forgot,
        fontSize: fontSize.fieldText,
        fontFamily: fontFamily.LatoRegular,
        marginVertical: responsiveHeight(1.5)
      },
      fvrtText: {
        fontFamily: 'Lato-Bold',
        fontWeight: 'bold',
        fontSize: fontSize.fieldText,
        marginVertical: responsiveHeight(1.5),
        color: Colors.blackText,
      },
      input: {
        height: '100%',
        width:'80%',
        padding: 10,
        fontSize: fontSize.fieldText,
        borderRadius: scale(6),
        color: Colors.fieldText,
      },
})