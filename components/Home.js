import React from 'react';
import { Text, StyleSheet, Image, Button, View, Platform, TouchableHighlight } from 'react-native';
import { Icon, LinearGradient } from 'expo';

// Component
import StarIcon from './StarIcon';

// Constant
import { SCANNER } from '../constants';

export default class Home extends React.Component {
   static navigationOptions = {
      title: 'Home',
   };

   handleOnPress = () => {
      const { changeScreen } = this.props;

      changeScreen(SCANNER);
   }

   renderReview = () => {
      return (
         <View style={styles.starContainer}>
            <StarIcon color="#FFFFFF" />
            <StarIcon color="#FFFFFF" />
            <StarIcon color="#FFFFFF" />
            <StarIcon color="#FFFFFF" />
            <StarIcon color="rgba(255,255,255,0.5)" />
            <Text style={styles.starText}> - 34 reviews</Text>
         </View>
      );
   }

   renderLocalisation = () => {
      return (
         <View style={styles.localisationContainer}>
            <Icon.Ionicons size={22} name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'} color="#FFFFFF" />
            <Text style={styles.localisationText}> Fasanenstraße 86, 10623</Text>
         </View>
      );
   }

   renderStartShoping = () => {
      return (
         <TouchableHighlight onPress={this.handleOnPress}>
            <View style={{backgroundColor: "#313131", width: 320, height: 60, borderRadius: 20, display: "flex", justifyContent: "center"}}>
               <Text style={{textAlign: "center", color: "white", fontSize: 15}}>
                  Start shopping now
               </Text>
            </View>
         </TouchableHighlight>
      );
   }

   render() {
      return (
         <View style={styles.homeContainer}>
            <LinearGradient
               colors={['rgba(0,0,0,0.8)', 'transparent']}
               style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  height: "100%",
               }}
            />
            <View>
               <Text style={styles.welcomeText}>
                  Start shopping at REWE
               </Text>
            </View>
            <View style={styles.imageContainer}>
               <Image
                  style={styles.image}
                  source={require('../assets/images/rewe.png')}
               />
            </View>
            <View>
               {this.renderLocalisation()}
               {this.renderReview()}
            </View>
            {this.renderStartShoping()}
         </View>
      );
   }
}

const styles = StyleSheet.create({
   welcomeText: {
      color: "white",
      fontSize: 42,
      fontWeight: "900",
      textAlign: "center",
   },
   localisationText: {
      color: "white",
   },
   starText: {
      color: "white",
      fontSize: 18,
   },
   starContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
   },
   localisationContainer: {
      marginTop: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
   },
   homeContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      height: "100%",
      padding: 30,
      backgroundColor: "#696969",
   },
   imageContainer: {
      width: 190,
      height: 190,
      backgroundColor: "#CD2627",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 64,
      borderWidth: 5,
      borderColor: "white",
   },
   image: {
      width: 160,
      height: 190,
      resizeMode: 'contain',
   },
});