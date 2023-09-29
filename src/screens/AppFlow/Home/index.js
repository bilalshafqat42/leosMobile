import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { AuthContext } from '../../../navigation/AuthProvider';
import Header from '../../../components/Header';
import firestore from '@react-native-firebase/firestore';

const Home = ({ navigation }) => {
  const { logout, user } = useContext(AuthContext);
  const [imageData, setImageData] = useState([]);
  const logou = () => {
    logout();
  };

  useEffect(() => {
    if (user) {
      firestore()
        .collection('Users')
        .doc(user.uid)
        .set({
          userId: user.uid,
          email: user.email,
        })
        .then(() => {
          console.log('User Registered');
        })
        .catch(error => {
          console.log('Something went wrong', error);
        });
    }
  }, [user]);

  const handleImagePress = async (image) => {
    try {
      const dataCollectionRef = firestore()
        .collection('images')
        .doc(image.id)
        .collection('pdf');
  
      const snapshot = await dataCollectionRef.get();
  
      const pdfDataArray = [];
  
      snapshot.docs.forEach((doc) => {
        const documentData = doc.data();
        const { name, link1, link2, status, } = documentData;
  
        
  
        // Check if the status is not "Sold" and if the timestamp is in the future
        if (status !== 'Sold') {
          // Create an object with the fetched data
          const pdfData = {
            name: name || '', // Use default values if fields are undefined
            link1: link1 || '',
            link2: link2 || '',
            status: status || '',
            
          };
  
          pdfDataArray.push(pdfData);
        }
      });
  
      // Now, navigate to the 'Units' screen with the filtered pdfDataArray
      navigation.navigate('Units', { image, pdfDataArray });
  
    } catch (error) {
      console.error('Error fetching PDF data:', error);
    }
  };

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const imageCollectionRef = firestore().collection('images');
        const snapshot = await imageCollectionRef.get();
        const images = snapshot.docs.map((doc) => ({
          id: doc.id,
          image: doc.data().image,
          timestamp: doc.data().timestamp, // Store the timestamp field
        }));
        setImageData(images);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImageData();
  }, []);

  return (
    <>
      <Header options={true} onPress={logou} showsButtons={false} showsPagination={false}/>
      <View style={styles.container}>
        <Swiper style={styles.wrapper} showsButtons={true}>
          {imageData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.touchableImage}
              onPress={() => handleImagePress(item)}
            >
              <Image source={{ uri: item.image }} style={styles.images} />
            </TouchableOpacity>
          ))}
        </Swiper>
      </View>
    </>
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
    marginBottom: responsiveHeight(10),
    width: responsiveWidth(80),
    height: responsiveHeight(70),
  },
});

export default Home;
