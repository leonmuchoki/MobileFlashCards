import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Constants } from 'expo'
import { blue, white }  from './utils/colors'
import Decks from './components/Decks'

MobiCardStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MobiCardStatusBar backgroundColor={blue} barStyle="light-content" />
        <Decks />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
