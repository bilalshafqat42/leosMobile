import { responsiveFontSize } from "react-native-responsive-dimensions"


const fontFamily = {
  LatoRegular: 'Lato-Regular',
  LatoBold: 'Lato-Bold',
  DinBold: 'D-DINCondensed-Bold'
}
const fontSize = {
  h1 : responsiveFontSize(2.2),
  h3 : responsiveFontSize(5),
  h2 : responsiveFontSize(2.5),
  lebal: responsiveFontSize(2),
  fieldText : responsiveFontSize(1.8),
  userName:responsiveFontSize(1.5),
  productName: responsiveFontSize(1.2),

}


export  {fontFamily,fontSize}