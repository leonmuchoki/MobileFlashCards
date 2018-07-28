import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { StyleSheet, Text, View, StatusBar,Platform } from 'react-native'
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'

import { setLocalNotification, clearLocalNotification, sendImmediateNotification } from './utils/helpers'
import { Constants } from 'expo'
import { blue, white, purple }  from './utils/colors'
import Decks from './components/Decks'
import DeckView from './components/DeckView'
import NewDeck from './components/NewDeck'
import QuestionView from './components/QuestionView'
import Quiz from './components/Quiz'
import Settings from './components/Settings'

MobiCardStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createMaterialTopTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'DECKS',
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK'
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'SETTINGS'
    }
  }, 
},
{
  navigationOptions: {
    swipeEnabled: true//false
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? blue : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : blue,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      },
      title: 'DECK DETAILS'
    }
  },
  QuestionView: {
    screen: QuestionView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      },
      title: 'Add Card'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      },
      title: 'Quiz'
    }
  },
})

class App extends Component {
  componentDidMount () {
    //clearLocalNotification()
    setLocalNotification()
    //sendImmediateNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <MobiCardStatusBar backgroundColor={blue} barStyle="light-content" />       
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default App
