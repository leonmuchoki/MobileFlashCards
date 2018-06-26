import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation'

import { Constants } from 'expo'
import { blue, white, gray }  from './utils/colors'
import Decks from './components/Decks'

MobiCardStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createMaterialTopTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'DECKS'
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MobiCardStatusBar backgroundColor={blue} barStyle="light-content" />       
        <Tabs />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
