import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { BarCodeScanner, Permissions, Haptic } from 'expo';

// Constant
import { CART } from '../constants';

export default class ScannerScreen extends React.Component {
  state = {
    scannedProductId: null,
    hasCameraPermission: null,
    groceryList: [],
    quantity: 1,
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleBarCodeScanned = ({ type, data }) => {
    const { scannedProductId } = this.state;
    const { products } = this.props;
  
    if (scannedProductId || !products[data.toString()]) return;
    if (Platform.OS === 'ios')
      Haptic.impact();
    this.setState({ scannedProductId: data.toString() });
  }

  flushProduct = () => this.setState({scannedProductId: null, quantity: 1})

  confirmProduct = () => {
    const { updateGroceryList, groceryList, products } = this.props;
    const { scannedProductId, quantity } = this.state;
    const list = groceryList;
    const product = products[scannedProductId];

    if (!product) return;
    for (let cnt = 0; cnt < quantity; cnt += 1) {
      if (list.length < 10) {
        product.id = scannedProductId;
        list.push(product);
      }
    }
    updateGroceryList(list);
    this.flushProduct();
  }

  handleAddProduct = () => {
    const { groceryList } = this.props;
    const { quantity } = this.state;

    if (groceryList.length + quantity >= 10) return;
    this.setState({quantity: quantity + 1})
  }

  handleSubProduct = () => {
    const { quantity } = this.state;

    if (quantity <= 0) return;
    this.setState({quantity: quantity - 1})
  }

  renderScanProduct = () => {
      return (
        <View style={styles.noProductScan}>
          <View style={{
            backgroundColor: "black",
            opacity: 0.5,
            borderRadius: 100,
          }}>
            <Text style={styles.textScanProdct}>
              Scan a product
            </Text>
          </View>
        </View>
      )
    }

  renderProductInfo() {
    const { products } = this.props;
    const { scannedProductId, quantity } = this.state;

    if (!scannedProductId || !products[scannedProductId])
        return this.renderScanProduct();
    const product = products[scannedProductId];

    return (
      <View style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%"}}>
        <View style={styles.productInfoContainer}>
          <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10}}>
            <View style={{display: "flex", flexDirection: "column"}}>
              <Text style={styles.productInfo}>{product.name}</Text>
              <Text style={styles.productInfoDescription}>{product.quantity}</Text>
            </View>
            <View style={{}}>
              <Text style={styles.productInfoPrice}>{product.price} €</Text>
            </View>
          </View>
          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-around", marginBottom: 10}}>
            <TouchableHighlight onPress={this.handleSubProduct} >
              <View style={{textAlign: "center"}}>
                <Text style={styles.addProduct}>-</Text>
              </View>
            </TouchableHighlight>
            <View>
              <Text style={styles.addProduct}>{quantity}</Text>
            </View>
            <TouchableHighlight onPress={this.handleAddProduct} >
              <View>
                <Text style={styles.addProduct}>+</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
            <TouchableHighlight onPress={this.flushProduct} >
              <Text style={{color: "red", fontSize: 20}}>CANCEL</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.confirmProduct} >
              <Text style={{color: "green", fontSize: 20}}>CONFIRM</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )

  }

  renderNavButton = () => {
    const { changeScreen, groceryList } = this.props;

    return (
      <View style={styles.navButtonContainer}>
        <TouchableHighlight onPress={() => changeScreen(CART)}>
          <View style={{backgroundColor: "black", opacity: 0.8, borderWidth: 1, borderColor: "white", minWidth: "70%", height: 50, borderRadius: 100, display: "flex", justifyContent: "center", marginBottom: 10}}>
             <Text style={{textAlign: "center", color: "white", fontSize: 15}}>
                Shopping Cart {groceryList.length}/10
             </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  renderOverlay = () => {
    return (
      <>
        <View style={{position: "absolute", width: "8%", height: "46%", top: "27%", backgroundColor: "black", opacity: 0.7}}></View>
        <View style={{position: "absolute", right: 0,width: "8%", height: "46%", top: "27%", backgroundColor: "black", opacity: 0.7}}></View>
        <View style={{position: "absolute", width: "100%", height: "30%", backgroundColor: "black", opacity: 0.7}}></View>
        <View style={{position: "absolute", bottom: 0, width: "100%", height: "30%", backgroundColor: "black", opacity: 0.7}}></View>
        <View style={{zIndex: 10, opacity: 1, position: "absolute", width: "83%", height: "46%", marginLeft: "8%", top: "27%", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <View style={{width: 15, height: 15, borderTopWidth: 2, borderLeftWidth: 2, borderTopColor: "white", borderLeftColor: "white"}}></View>
            <View style={{width: 15, height: 15, borderRightWidth: 2, borderTopColor: "white", borderRightColor: "white", borderTopWidth: 2, marginRight: -1}}></View>
          </View>
          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
              <View style={{width: 15, height: 15, borderLeftWidth: 2, borderBottomColor: "white", borderLeftColor: "white", borderBottomWidth: 2}}></View>
              <View style={{width: 15, height: 15, borderRightWidth: 2, borderBottomColor: "white", borderRightColor: "white", borderBottomWidth: 2, marginRight: -1}}></View>
          </View>
        </View>
      </>
    );
  }

  renderCodeScanner = () => {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null)
      return <Text>Requesting for camera permission...</Text>;
    else if (hasCameraPermission === false)
      return <Text>No access to camera...</Text>;
    else
      return <BarCodeScanner onBarCodeScanned={this.handleBarCodeScanned} style={{ width: "100%", height: "100%", zIndex: 0 }} />
  }

  render() {
    return (
      <>
        {this.renderCodeScanner()}
        {this.renderOverlay()}
        <View style={styles.popupScanProduct}>
          {this.renderProductInfo()}
        </View>
        <View style={styles.bottom}>
          {this.renderNavButton()}
        </View>
      </>
    );
  }
}


const styles = StyleSheet.create({
  textScanProdct: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
    backgroundColor: "black",
    borderRadius: 100,
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
  addProduct: {
    color: "white",
    fontSize: 26,
    width: 60,
    height: 40,
    textAlign: "center",
  },
  popupScanProduct: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center"
  },
  bottom: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    margin: "auto",
    position: 'absolute',
    bottom:0
  },
  container: {
    flex: 1,
    backgroundColor: '#2F2F2F',
  },
  noProductScan: {
    marginTop: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  productInfo: {
    color: "white",
    fontSize: 24,
  },
  productInfoDescription: {
    color: "white",
    fontSize: 10,
  },
  productInfoPrice: {
    marginLeft: 15,
    fontWeight: "900",
    color: "white",
    fontSize: 30,
  },
  productInfoContainer: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#2F2F2F",
    opacity: 0.9,
  },
  productInfoButton: {
    color: "#841584",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  productInfoAddText: {
    color: "yellow",
    fontSize: 15,
  },
  navButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9,
  },
  shoppingImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: "white",
  }
});
