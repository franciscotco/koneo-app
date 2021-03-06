import React from 'react';
import { StyleSheet, View, Button, StatusBar, Platform, Image } from 'react-native';

// Component
import ScannerScreen from './components/ScannerScreen';
import CartScreen from './components/CartScreen';
import Home from './components/Home';
import Finalize from './components/Finalize';

// Utils
import { create_json } from './components/utils';

// Constant
import { HOME, SCANNER, CART, FINALIZE, ADD_PRODUCT, URL, POST, TOKEN_OPT, TOKEN, GET, GET_PRODUCT } from './constants';

// const products = {
//   "7622100913696": {
//     name: "Malboro Red",
//     quantity: "20 pcs",
//     detail: 1,
//     description: "Bad for you health",
//     price: 7.50,
//   },
//   "4250542847472": {
//     name: "Connor Collegeblock",
//     quantity: "80 pages",
//     detail: 1,
//     description: "Writing paper",
//     price: 4.00,
//   },
//   "5000112555134": {
//     name: "Coca-Cola Zero",
//     quantity: "250 mL",
//     detail: 1,
//     description: "Bad for your health",
//     price: 2.30,
//   },
//   "9001475040486": {
//     name: "Ginger Lemon",
//     quantity: "20 TeaBags",
//     detail: 1,
//     description: "Herbal Infusion",
//     price: 1.83,
//   },
//   "4260426836041": {
//     name: "Iron Max",
//     quantity: "900 g",
//     detail: 1,
//     description: "100% whey protein",
//     price: 29.99,
//   },
//   "42237792": {
//     name: "GIZEH",
//     quantity: "100 paper",
//     detail: 1,
//     description: "Extra fine",
//     price: 0.99,
//   },
// }

export default class App extends React.Component {
  state = {
    currentScreen: HOME,
    groceryList: [],
    products: {}
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    fetch(URL + GET_PRODUCT + TOKEN_OPT + TOKEN,{
      method: GET,
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    .then(res => {console.log("RES :", res); return res.json()})
    .then(resJson => {
      const products = {};
      resJson.forEach(elem => {
        const { barcode } = elem;
        products[barcode] = elem;
        console.log(elem.picture);
        products[barcode].picture = <Image source={{uri: elem.picture}} style={{ width: 50, height: 50, resizeMode: 'contain',}}/>;
      })
      return products;
    })
    .then(resJson => this.setState({products: resJson}))
    .catch(err => console.log("Err :", err))
  }

  updateGroceryList = (groceryList) => this.setState({groceryList})

  changeScreen = (screen) => this.setState({ currentScreen: screen })

  renderDefaultView = () => {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.changeScreen(SCANNER)}
          title="SCANNER"
          color="#841584"
        />
        <Button
          onPress={() => this.changeScreen(CART)}
          title="CART"
          color="#841584"
        />
      </View>
    );
  }

  renderView() {
    const { currentScreen, groceryList, products } = this.state;
    console.log("PRODUCTS STATE :", products);

    switch (currentScreen) {
      case HOME:
        return <Home changeScreen={this.changeScreen}/>
      case SCANNER:
      return <ScannerScreen products={products} changeScreen={this.changeScreen} updateGroceryList={this.updateGroceryList} groceryList={groceryList}/>
      case CART:
        return <CartScreen groceryList={groceryList} changeScreen={this.changeScreen} updateGroceryList={this.updateGroceryList} />
      case FINALIZE:
        return <Finalize updateGroceryList={this.updateGroceryList} changeScreen={this.changeScreen} groceryList={groceryList}/>
      default:
        return this.renderDefaultView();
    }
  }

  handleAddProduct = () => {
    Object.keys(products).forEach(key => {
      console.log("Product :", products[key])
      console.log("BODY :", create_json(products[key], key))
      fetch(URL + ADD_PRODUCTS + TOKEN_OPT + TOKEN, {
        method: POST,
        body: create_json(products[key], key),
        headers: new Headers({ 'Content-Type': 'application/json' })
      })
      .then(res => console.log("RES :", res))
      .catch(err => console.log("Err :", err))
    })
  }

  addProducts = () => {
    return (
      <Button
        title="CREATE PRODUCT"
        onPress={() => this.handleAddProduct()}
      />
    );
  }

  render() {
    return (
      <View style={{width: "100%", height: "100%"}}>
        {this.renderView()}
        {/* {this.addProducts()} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F2F2F',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
