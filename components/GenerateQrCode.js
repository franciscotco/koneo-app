import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode';


export default class GenerateQrCode extends React.Component {
  render() {
     const { data } = this.props;

    return (
      <View style={styles.qrCode}>
        <QRCode
          value={data}
          size={300}
          bgColor='black'
          fgColor='white'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   qrCode: {
     backgroundColor: '#696969',
     alignItems: 'center',
     justifyContent: 'center'
   },
 })