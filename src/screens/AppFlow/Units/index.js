import React, {useState, useEffect} from 'react';
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
import {Colors} from '../../../services/utilities/Colors';
import {AppStyles} from '../../../services/utilities/AppStyle';
import RNFetchBlob from 'rn-fetch-blob'; // Import RNFetchBlob
import {fontSize} from '../../../services/utilities/Fonts';
import Header from '../../../components/Header';
import {scale} from 'react-native-size-matters';
import Share from 'react-native-share';

const Units = ({navigation, route}) => {
  const [sortedPdfDataArray, setSortedPdfDataArray] = useState([]);
  const sortData = data => {
    return data.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      // Extract the alphanumeric part of the name
      const alphaNumericA = nameA.match(/[a-zA-Z]+|[0-9]+/g);
      const alphaNumericB = nameB.match(/[a-zA-Z]+|[0-9]+/g);

      // Compare each part of the alphanumeric strings
      for (
        let i = 0;
        i < Math.min(alphaNumericA.length, alphaNumericB.length);
        i++
      ) {
        if (isNaN(alphaNumericA[i]) && isNaN(alphaNumericB[i])) {
          // Both parts are alphabetic, compare them as strings
          const comparison = alphaNumericA[i].localeCompare(alphaNumericB[i]);
          if (comparison !== 0) {
            return comparison;
          }
        } else {
          // At least one part is numeric, compare them as numbers
          const numA = parseFloat(alphaNumericA[i]) || 0;
          const numB = parseFloat(alphaNumericB[i]) || 0;
          if (numA !== numB) {
            return numA - numB;
          }
        }
      }

      // If all parts are equal, compare the full strings
      return nameA.localeCompare(nameB);
    });
  };
  useEffect(() => {
    // Sort the pdfDataArray and set it in the state
    const sortedData = sortData(pdfDataArray);
    setSortedPdfDataArray(sortedData);
  }, [pdfDataArray]);
  const back = () => {
    navigation.goBack();
  };
  const {image, pdfDataArray} = route.params;
  // const [Path, setPath] = useState('';)

  const handleDownloadPDF = async pdfLink => {
    try {
      if (Platform.OS === 'android') {
        const granted = await requestStoragePermissionAndroid();
        if (!granted) {
          console.log('Storage Permission Denied.');
          Alert.alert(
            'Storage Permission Required',
            'Please grant storage permission to download the report.',
          );
        } else {
          console.log('Storage Permission Granted.');
          downloadReport(pdfLink);
        }
      } else {
        downloadReport(pdfLink);
        // sharefile(pdfLink);
      }
    } catch (error) {
      console.error('Error checking storage permission:', error);
    }
  };
  const sharefile = async path => {
    const options = {
      title: 'Share via',
      message: 'Check out this file!',
      url: `file://${path}`,
      type: 'application/pdf',
    };
    await Share.open(options)
      .then(res => {
        console.log('Shared successfully');
      })
      .catch(error => {
        console.error('Error sharing:', error);
      });
  };

  const downloadReport = async pdfLink => {
    const PictureDir = RNFetchBlob.fs.dirs.DownloadDir;
    const date = new Date();
    const fileName = `Report_Download_${Math.floor(
      date.getTime() + date.getSeconds() / 2,
    )}.pdf`;
    const subfolderName = 'bilalapp';
    const subfolderPath = `${PictureDir}/${subfolderName}`;
    const path = `${subfolderPath}/${fileName}`;
    const options = Platform.select({
      android: {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path,
          description: 'Risk Report Download',
          title: fileName,
        },
      },
      ios: {
        fileCache: true,
        path,
      },
    });

    try {
      await RNFetchBlob.config(options).fetch('GET', pdfLink); // Use RNFetchBlob.config
      console.log('Report downloaded successfully to:', path);
      Alert.alert(
        'Report Downloaded Successfully',
        `The report has been saved to ${path}`,
      );
      sharefile(path);
    } catch (error) {
      console.error('Error downloading report:', error);
      Alert.alert(
        'Download Error',
        'There was an error while downloading the report. Please try again later.',
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
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('Error requesting storage permission:', error);
      return false;
    }
  };

  const renderUnitItem = ({item}) => (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={[styles.text, {fontWeight: 'bold'}]}>{item.name}</Text>
      </View>
      <View style={{width: '100%'}}>
        <Text style={[styles.text]}>
          {item.bed} | {item.area}
        </Text>
      </View>
      <View style={[styles.downloadAreaSection, {flexDirection: 'row'}]}>
        <TouchableOpacity
          style={styles.pdf}
          onPress={() => handleDownloadPDF(item.link1)}>
          <Text style={styles.linkText}>Download PDF 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pdf}
          onPress={() => handleDownloadPDF(item.link2)}>
          <Text style={styles.linkText}>Download PDF 2</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <Header onPress={back} Image={true} />
      <FlatList
        data={sortedPdfDataArray}
        renderItem={renderUnitItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={[
          AppStyles.contentContainer,
          {backgroundColor: Colors.backgroud1},
        ]}
      />
    </>
  );
};

export default Units;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(85),
    height: responsiveHeight(15),
    backgroundColor: Colors.unitsBackgroundColor,
    borderRadius: scale(5),
    paddingHorizontal: '3%',
    // paddingVertical:"10%",
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(2),
  },
  pdf: {
    marginVertical: responsiveHeight(0.5),
    backgroundColor: Colors.backgroud1,
    width: responsiveWidth(38),
    height: responsiveHeight(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: responsiveWidth(3),
    borderRadius: scale(5),
    // padding: "5%",
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
    width: '49%',
  },
  linkText: {
    color: Colors.lebal,
    fontSize: fontSize.lebal,
  },
  container1: {
    marginTop: responsiveHeight(0.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '6%',
  },
  container2: {
    // flexDirection: 'row',
    // justifyContent: 'start',
    width: '100%',
    marginTop: '0%',
    marginBottom: '0%',
  },
  container3: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // width: '100%',
    // marginTop: '6%',
    marginBottom: '3%',
  },
  downloadAreaSection: {
    marginBottom: '3%',
  },
});
