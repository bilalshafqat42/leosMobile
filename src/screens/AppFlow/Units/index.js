import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
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
import { scale } from 'react-native-size-matters';

const unitsData = [
  { id: '1', name: 'Unit 01' },
  { id: '2', name: 'Unit 02' },
  { id: '3', name: 'Unit 03' },
  // Add more items as needed
];

const Units = ({ navigation }) => {
  const [isChecked, setIsChecked] = React.useState(false);
  const toggleCheck = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };
  const isButtonDisabled = !isChecked;
  const buttonColor = isButtonDisabled ? Colors.disabledButton : Colors.button1;
  const back = () => {
    navigation.goBack();
  };

  const renderUnitItem = ({ item }) => (
    <View style={{alignItems:'center'}}>
    <View style={styles.container}>
      <Text style={[AppStyles.fvrtText, { fontSize: responsiveFontSize(2), fontWeight: 'bold' }]}>
        {item.name}
      </Text>
      <TouchableOpacity style={styles.pdf}>
        <Text style={{ fontSize: responsiveFontSize(1.7), color: Colors.lebal, backgroundColor: Colors.backgroud1, height: responsiveHeight(3), alignContent: 'center', padding: '3%', paddingLeft: '10%' }}>
          Download pdf
        </Text>
      </TouchableOpacity>
    </View>
    </View>
  );

  return (
    <>
      <Header Image={true} onPress={back} />
      <FlatList
        data={unitsData}
        renderItem={renderUnitItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[AppStyles.contentContainer, { backgroundColor: Colors.backgroud1 }]}
      />
    </>
  );
};

export default Units;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(85),
    height: responsiveHeight(8),
    backgroundColor: Colors.fieldBackground,
    flexDirection: 'row',
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(1)
  },
  pdf: {
    width: responsiveWidth(27),
    height: responsiveHeight(3),
    justifyContent: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginVertical: responsiveHeight(5),
  },
  toggle: {
    width: scale(21),
    height: scale(21),
    borderRadius: 5,
    backgroundColor: Colors.fieldBackground,
    marginLeft: responsiveWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.toggleText,
    fontSize: fontSize.lebal,
  },
  tick: {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
  },
});
