import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Colors } from '../../../services/utilities/Colors';
import { AppStyles } from '../../../services/utilities/AppStyle';
import RNFetchBlob from 'rn-fetch-blob';
import { fontSize } from '../../../services/utilities/Fonts';
import Header from '../../../components/Header';

const Units = ({ navigation, route }) => {
  const { image, fieldNames, fieldData } = route.params;

  const handleDownloadPDF = async (fieldData) => {
    if (!fieldData) {
      console.error('PDF URL is undefined.');
      return;
    }

    try {
      // Create a directory to store the downloaded PDFs (you can change the directory as needed)
      const dirs = RNFetchBlob.fs.dirs;
      const downloadDir = dirs.DownloadDir;

      // Extract the filename from the URL (e.g., 'document.pdf')
      const filename = fieldData.pushString()
      // Create a path for the downloaded file
      const filePath = `${downloadDir}/${filename}`;

      // Start the download
      const res = await RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: 'Downloading PDF',
          description: 'Downloading PDF file',
          path: filePath,
        },
      }).fetch('GET', fieldData);

      // Check the download status
      if (res.respInfo.status === 200) {
        console.log('PDF downloaded successfully to:', filePath);

        // Now, you can open the downloaded PDF using a PDF viewer library
        // Here, we use 'rn-pdf-reader-js' for demonstration purposes
        // You can replace this with your preferred PDF viewer library
        navigation.navigate('PDFViewer', { filePath }); // Navigate to a PDF viewer screen

      } else {
        console.error('Error downloading PDF:', res.respInfo);
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };


  const renderUnitItem = ({ item, index }) => (
    <View style={{ alignItems: 'center' }}>
      <View style={styles.container}>
        <Text
          style={[
            AppStyles.fvrtText,
            { fontSize: responsiveFontSize(2), fontWeight: 'bold' },
          ]}
        >
          {fieldNames[index]}
        </Text>
       
        <TouchableOpacity style={styles.pdf} onPress={() => handleDownloadPDF(fieldData[index])}>
          <Text
            style={{
              fontSize: responsiveFontSize(1.7),
              color: Colors.lebal,
              backgroundColor: Colors.backgroud1,
              height: responsiveHeight(3),
              alignContent: 'center',
              padding: '3%',
              paddingLeft: '10%',
            }}
          >
            Download PDF
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
    <Header Image={true} />
      <FlatList
        data={fieldNames} // Use fieldNames as the data source
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
    flexDirection: 'row',
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(1),
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
    width: responsiveWidth(21),
    height: responsiveHeight(21),
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
});