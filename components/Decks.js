import React, { Component} from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import { getDecks } from '../utils/api'
import  { gray,black } from '../utils/colors'

class Decks extends Component {

  state = {
    decks: {}
  }

  componentDidMount = () => {
    this.setState(()=>{
      decks: this.fetchDecksInfo()
    })
  }

  fetchDecksInfo = () => {
    let deckDataRaw = getDecks()
    let deckData = []
    Object.keys(deckDataRaw).map((deck)=>{
      let countCards = Object.keys(deckDataRaw[deck]).length;
      let deck = {deckName: deck, deckCount: countCards}
      deckData.push(deck)
    })

  }

  render() {
    const decks = this.state.decks
    return (
      <View style={styles.container}>
        <FlatList
          data = {decks}
          renderItem = {({item})=>(
            <View style={styles.deckCard}>
              <Text style={styles.deckName}>item.deckName</Text>
              <Text style={styles.deckCount}>item.deckCount</Text>
            </View>
          )}
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
    padding: 10
  },
  deckName: {
    fontSize: 35,
    textAlign: 'center',
    color: gray
  },
  deckCount: {
    fontSize: 25,
    textAlign: 'center',
    color: black,
    marginTop: 10
  }
})

export default Decks