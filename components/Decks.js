import React, { Component} from 'react'
import { View, FlatList, Text, StyleSheet,TouchableOpacity } from 'react-native'

import { getDecks } from '../utils/api'
import { setDummyDataDecks } from '../utils/_decks'
import  { gray,black,blue,lightPurp,white } from '../utils/colors'

class Decks extends Component {
  state = {
    decks: []
  }

  componentDidMount = () => {
     this.fetchDecksInfo()
  }

  fetchDecksInfo = () => {
    let deckData = []
    getDecks().then((results)=>{
      Object.keys(results).map((deck)=> {
      let countCards = 0//Object.keys(results[deck]).length
      //alert(JSON.stringify(results[deck]))
      if (results[deck].questions !== undefined) {
        countCards = results[deck].questions.length
      }
      let deck_o = { deckName: deck, deckCount: countCards }
      deckData.push(deck_o)   
      this.setState({decks: deckData})
    })
    
  })
  }

  goToDeckView = (deckName, deckCount) => {
    this.props.navigation.navigate('DeckView', {title: deckName, cardCount: deckCount})
    //alert('watidatya...')
  }


  render() {
    const navigate = this.props.navigation

    let decks = this.state.decks
    if (this.state.decks.length>0) 
    {
      //decks.push(this.state.decks)
    }
    else {
      decks.push('NO decks added')
    }
    
    return (
      <View style={styles.container}>
         
          <FlatList
          data = {decks}
          renderItem = {({item})=>(
            <View style={styles.deckCard}>
              <Text style={styles.deckName}>{item.deckName}</Text>
              <Text style={styles.deckCount}>{item.deckCount} cards</Text>
              <TouchableOpacity style={styles.btnViewDeck} 
                                onPress={() => this.goToDeckView(item.deckName, item.deckCount)}>
                <Text style={{color: white}}>VIEW</Text>
              </TouchableOpacity>
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
  },
  btnViewDeck: {
    marginTop: 15,
    backgroundColor: lightPurp,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
  }
})

export default Decks