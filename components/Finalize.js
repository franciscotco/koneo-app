import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

// Component
import GenerateQrCode from './GenerateQrCode';

// Constant
import { HOME } from '../constants';

export default class Finalize extends React.Component {

  handleChangeScreen = () => {
    const { changeScreen, updateGroceryList } = this.props;

    updateGroceryList([]);
    changeScreen(HOME);
  }

  parsedData = () => {
    const { groceryList } = this.props;
    const list = [];

    groceryList.forEach(elem => list.push(elem.id))
    return JSON.stringify(list);
  }

  renderButton = () => (
    <TouchableHighlight onPress={this.handleChangeScreen}>
      <View style={styles.buttonView}>
          <Text style={styles.buttonText}>
            Check Out
          </Text>
      </View>
    </TouchableHighlight>
  )

  render() {
    return (
      <View style={styles.finalizeContainer}>
        <GenerateQrCode data={this.parsedData()} />
        <Text style={styles.scanText}>Present your QrCode</Text>
        {this.renderButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  finalizeContainer: {
    width: "100%",
    backgroundColor: "#696969",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  scanText: {
    fontSize: 20,
  },
  buttonText: {
    textAlign: "center", color: "white", fontSize: 15
  },
  buttonView: {
    backgroundColor: "#313131", width: 320, height: 60, borderRadius: 20, display: "flex", justifyContent: "center"
  }
})