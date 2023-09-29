import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Platform,
} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Colors } from '../../../services/utilities/Colors';
import { AppStyles } from '../../../services/utilities/AppStyle';
import RNFetchBlob from 'rn-fetch-blob'; // Import RNFetchBlob
import { fontSize } from '../../../services/utilities/Fonts';
import Header from '../../../components/Header';

const Units = ({ navigation, route }) => {
  const back = () =>{
    navigation.goBack()
  }
  const { image, pdfDataArray } = route.params;

  const handleDownloadPDF = async (pdfLink) => {
    try {
      if (Platform.OS === 'android') {
        const granted = await requestStoragePermissionAndroid();
        if (!granted) {
          console.log('Storage Permission Denied.');
          Alert.alert(
            'Storage Permission Required',
            'Please grant storage permission to download the report.'
          );
        } else {
          console.log('Storage Permission Granted.');
          downloadReport(pdfLink);
        }
      } else {
        // For iOS and other platforms, no permission check is needed
        downloadReport(pdfLink);
      }
    } catch (error) {
      console.error('Error checking storage permission:', error);
    }
  };

  const downloadReport = async (pdfLink) => {
    const PictureDir = RNFetchBlob.fs.dirs.DownloadDir;
    const date = new Date();
    const fileName = `Report_Download_${Math.floor(
      date.getTime() + date.getSeconds() / 2
    )}.pdf`;
    const path = `${PictureDir}/${fileName}`;

    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path,
        description: 'Risk Report Download',
        title: fileName,
      },
    };

    try {
      await RNFetchBlob.config(options).fetch('GET', pdfLink); // Use RNFetchBlob.config
      console.log('Report downloaded successfully to:', path);
      Alert.alert(
        'Report Downloaded Successfully',
        `The report has been saved to ${path}`
      );
    } catch (error) {
      console.error('Error downloading report:', error);
      Alert.alert(
        'Download Error',
        'There was an error while downloading the report. Please try again later.'
      );
    }
  };

  const requestStoragePermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'Please grant storage permission to download the report.',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('Error requesting storage permission:', error);
      return false;
    }
  };

  const renderUnitItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.container1}>
      <Text style={[styles.text, { fontWeight: 'bold' }]}>{item.name}</Text>
      <Text style={[styles.text, { fontWeight: 'bold', }]}>Studio</Text>
      </View>
      <View style={{flexDirection: 'row',}}>
      <TouchableOpacity
        style={styles.pdf}
        onPress={() => handleDownloadPDF(item.link1)}
      >
        <Text style={styles.linkText}>Download PDF 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.pdf}
        onPress={() => handleDownloadPDF(item.link2)}
      >
        <Text style={styles.linkText}>Download PDF 2</Text>
      </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <Header onPress={back} Image={true} />
      <FlatList
        data={pdfDataArray} // Use pdfDataArray as the data source
        renderItem={renderUnitItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={[
          AppStyles.contentContainer,
          { backgroundColor: Colors.backgroud1 },
        ]}
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
    
    paddingHorizontal: '5%',
    alignItems: 'center',
    alignSelf:'center',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(1),
  },
  pdf: {
    marginVertical:responsiveHeight(0.5),
    backgroundColor:Colors.backgroud1,
    width: responsiveWidth(35),
    height: responsiveHeight(3),
    justifyContent: 'center',
    alignItems:'center',
    marginHorizontal:responsiveWidth(3)
  },
  toggleContainer: {
    flexDirection: 'row',
    marginVertical: responsiveHeight(5),
  },
  toggle: {
    width: responsiveWidth(21),
    height: responsiveHeight(21),
    borderRadius: 5,
    backgroundColor: Colors.fieldBackground,
    marginLeft: responsiveWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.blackText,
    fontSize: fontSize.lebal,
    width:'45%'
  },
  linkText: {
    color: Colors.lebal,
    fontSize: fontSize.lebal,
  },
  container1:{
    marginTop:responsiveHeight(0.5),
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%'
  }
});
