import React, { Component} from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'

import { getDecks } from '../utils/api'
import { setDummyDataDecks } from '../utils/_decks'
import  { gray,black,blue } from '../utils/colors'
import { INTERRUPTION_MODE_ANDROID_DUCK_OTHERS } from 'expo/src/av/Audio';

class Decks extends Component {

  state = {
    decks: []
  }

  componentDidMount = () => {
     this.fetchDecksInfo()
  }

  fetchDecksInfo = () => {
    let deckDataRaw = getDecks()
    let deckData = []
    Object.keys(deckDataRaw).map((deck)=> {
      let countCards = Object.keys(deckDataRaw[deck]).length
      let deck_o = { deckName: deck, deckCount: countCards }
      deckData.push(deck_o)
    })
   this.setState({decks: deckData})
  }

  render() {
    let decks = this.state.decks//this.state.decks
    if (this.state.decks.length>0) 
    {
      //decks.push(this.state.decks)
    }
    else {
      decks.push('hakuna any!')
    }
    
    return (
      <View style={styles.container}>
         
          <FlatList
          data = {decks}
          renderItem = {({item})=>(
            <View style={styles.deckCard}>
              <Text style={styles.deckName}>{item.deckName}</Text>
              <Text style={styles.deckCount}>{item.deckCount} cards</Text>
            </View>
            )}
          keyExtractor={(item, index) => index.toString() }
          /> 
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deckCard: {
    borderWidth: 3,
    borderRadius: 3,
    borderColor: '#000',
    width: 300,
    height: 300,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  deckName: {
    fontSize: 35,
    textAlign: 'center',
    color: blue
  },
  deckCount: {
    fontSize: 25,
    textAlign: 'center',
    color: black,
    marginTop: 10
  }
})

export default Decks