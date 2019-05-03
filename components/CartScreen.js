import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableHighlight, Image } from 'react-native';
import { LinearGradient } from 'expo';

// Constant
import { SCANNER, FINALIZE } from '../constants';

export default class CartScreen extends React.Component {
    state = {price: 0}

    getPriceGroceryList = () => {
        const { groceryList } = this.props;
        let price = 0;

        groceryList.forEach(elem => price += elem.price)
        return price;
    }

    concatGroceryList = () => {
        const { groceryList } = this.props;
        const list = [];
        const item = {};

        groceryList.forEach(elem => (!item[elem.name]) ? item[elem.name] = {...elem} : item[elem.name].detail += 1);
        Object.keys(item).forEach(key => list.push(item[key]));
        return list;
    }

    removeGroceryListElem = (item) => () => {
        const { groceryList, updateGroceryList } = this.props;
        const list = [];

        groceryList.forEach(elem => { if (elem.name !== item.name) list.push(elem) });
        updateGroceryList(list);
    }

    renderButton = (text, press, bgColor) => (
        <TouchableHighlight onPress={press}>
            <View style={{ backgroundColor: bgColor, width: 320, height: 50, borderRadius: 20, display: "flex", justifyContent: "center", marginBottom: 10 }}>
                <Text style={{ textAlign: "center", color: "white", fontSize: 22 }}>
                    {text}
                </Text>
            </View>
        </TouchableHighlight>
    )

    renderNavButton = () => {
        const { changeScreen } = this.props;

        return (
            <View style={styles.payNowButton}>
                {this.renderButton("Scan another product", () => changeScreen(SCANNER), "#313131")}
                {this.renderButton("Pay now", () => changeScreen(FINALIZE), "green")}
            </View>
        );
    }

    renderList = (elem, index) => {
        const { item } = elem;
        const { price, name, detail, image } = item;

        return (
            <>
                <View style={styles.itemCart}>
                <Text style={{ color: 'white', fontSize: 16 }}>{detail}</Text>
                    <View>
                        <Image
                            source={image}
                            style={{width: 25, height: 25}}
                        />
                    </View>
                    <Text style={{ color: 'white', width: "45%", fontSize: 16 }}>{name}</Text>
                    <Text style={{ color: 'white', fontSize: 25 }}>{price} €</Text>
                    <TouchableHighlight onPress={this.removeGroceryListElem(item)}>
                        <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Image
                                source={require('../assets/images/remove.png')}
                                style={styles.removeImage}
                            />
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.borderBottomItem}></View>
            </>
        )
    }

    render() {
        const { groceryList } = this.props;

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#2F2F2F" />
                <LinearGradient
                    colors={['rgba(0,0,0,0.8)', 'transparent']}
                    style={styles.linearGradient}
                />
                <FlatList
                    data={this.concatGroceryList()}
                    renderItem={this.renderList}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total {groceryList.length}/10 for {this.getPriceGroceryList()} €</Text>
                </View>
                {this.renderNavButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#696969',
        alignItems: 'center',
        justifyContent: 'center',
    },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
    },
    totalContainer: {
        marginTop: 2,
        borderBottomWidth: 3,
        borderColor: "grey",
        display: "flex",
        flexDirection: "row",
    },
    totalText: {
        color: "white", fontSize: 20 
    },
    itemCart: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
    },
    borderBottomItem: {
        marginTop: 6,
        marginLeft: "8%",
        width: "80%",
        borderBottomWidth: 1,
        borderColor: "grey",
        marginBottom: 12,
    },
    payNowButton: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        borderRadius: 6,
    },
    removeImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: "red",
    }
});
