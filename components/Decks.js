import React, { Component} from 'react'
import { connect } from 'react-redux';
import { View, FlatList, Text, StyleSheet,TouchableOpacity } from 'react-native'

import { getDecks } from '../utils/api'
import { setDummyDataDecks } from '../utils/_decks'
import  { gray,black,blue,lightPurp,white } from '../utils/colors'
import { fetchAllDecks } from '../actions/index';

class Decks extends Component {
  state = {
    decks: []
  }

  componentDidMount = () => {
     this.props.getDecks()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDecks !== this.props.allDecks) {
      //pre-poluate fields
      this.processDeckInfo()
    }
  }

  processDeckInfo = () => {
    let deckData = []
    const decks = this.props.allDecks
    console.log('processDeckInfo>>> ' + JSON.stringify(deckData))
    decks.map((deck)=> {
      let countCards = 0//Object.keys(results[deck]).length
      let deckQuestions = []
      if (deck.questions !== undefined) {
        countCards = deck.questions.length
        //deckQuestions.push(results[deck].questions)
        deckQuestions = [...deckQuestions,...deck.questions]
      }
      let deck_o = { deckName: deck.title, deckCount: countCards, deckQuestions: deckQuestions}
      deckData.push(deck_o)   
      this.setState({decks: deckData})
    })
  }

  goToDeckView = (deckName, deckCount, questions) => {
    this.props.navigation.navigate('DeckView', {title: deckName, cardCount: deckCount, questions: questions})
    //alert('watidatya...')
  }


  render() {
    const navigate = this.props.navigation

    let decks = this.state.decks
    console.log('render decks..' + JSON.stringify(decks))
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
                                onPress={() => this.goToDeckView(item.deckName, item.deckCount, item.deckQuestions)}>
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

const mapStateToProps = (state) => {
  //console.log('mapStateToProps::Decks:state-- ' + JSON.stringify(state.decks))
   //console.log('mapStateToProps::fetched: ' + allPosts.fetched)
   //alert(JSON.stringify(state))
 
  return { 
          allDecks: state.decks.decks
        }
 }

const mapDispatchToProps = dispatch => {
  return {
    getDecks: () => dispatch(fetchAllDecks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)