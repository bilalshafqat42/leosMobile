import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { appImages } from '../../../services/utilities/Assets';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const imageData = [
  { id: '1', source: appImages.buliding },
  { id: '2', source: appImages.commingsoon },
  { id: '3', source: appImages.commingsoon },
];

const Home = ({navigation}) => {
  const handleImagePress = (imageId) => {
    navigation.navigate('Units')
    // alert(`You pressed image with ID ${imageId}`);
  };

  return (
    <View style={styles.container}>
      <Swiper style={styles.wrapper} showsButtons={true}>
        {imageData.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.touchableImage}
            onPress={() => handleImagePress(item.id)}
          >
            <Image source={item.source} style={styles.images} />
          </TouchableOpacity>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {},
  touchableImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  images: {
    width: responsiveWidth(80),
    height: responsiveHeight(70),
  },
});

export default Home;
