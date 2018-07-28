import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';

import  { gray,black,blue,lightPurp,white } from '../utils/colors'
import { fetchDeck } from '../actions/index';

class DeckView extends Component {

  state = {
    deck: []
  }

  componentDidMount(){
    const { title } =  this.props.navigation.state.params
    this.props.getDeck(title)
    this.updateDeckData()
    //console.log('DeckView::componentDidMount:::::::::::::::')
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.deck !== this.props.deck) {
      this.updateDeckData()
    }
  }

  updateDeckData = () => {
    return this.props.deck
  }

  startQuiz = (deckName,cardCount) => {
    let {questions} = this.props.navigation.state.params
    this.props.navigation.navigate('Quiz', {deckName: deckName, cardCount: cardCount, questions: questions})
  }

  addDeckCard = (deckName) => {
    this.props.navigation.navigate('QuestionView', {deckName: deckName})
  }

  alertNoQuestion = () => {
    alert('No Card added')
  }

  render() {
    const { deck, isLoading } = this.props
    const deckData = this.updateDeckData()
    
    let cardCount
    if (deckData !== undefined) {
      cardCount = deckData["questions"].length
    }
     
    //console.log('+++++deckData+++++' + JSON.stringify(deckData))
    return (
      <View style={styles.container}>
        {isLoading === false 
          ? 
          <View>
          {deckData !== undefined &&
            <View>
              <Text style={styles.deckTitle}>{deckData["title"]}</Text>
              <Text style={styles.deckCount}>{cardCount} cards</Text>
              <View style={{marginTop: 150}}>
                <TouchableOpacity style={[styles.btnCards, styles.btnCardAdd]} onPress={() => this.addDeckCard(deckData["title"])}>
                  <Text style={{fontSize: 25}}>Add Card</Text>
                </TouchableOpacity>
                { deckData["questions"] !== undefined && deckData["questions"].length > 0 
                  ? <TouchableOpacity style={[styles.btnCards, styles.btnCardQuiz]} onPress={() => this.startQuiz(deckData["title"],cardCount)}>
                      <Text style={{fontSize: 25, color: white}}>Start Quiz</Text>
                    </TouchableOpacity>
                  : <TouchableOpacity style={[styles.btnCards, styles.btnCardQuiz]} onPress={this.alertNoQuestion}>
                      <Text style={{fontSize: 25, color: white}}>Start Quiz</Text>
                    </TouchableOpacity>
                }
              </View>
            </View>
          }
          
          </View>
          :
            <View>
              <Text>Loading...please wait</Text>
            </View>
        }
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
  deckTitle: {
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
  btnCards: {
    marginTop: 15,
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    height: 65,
    borderRadius: 2,
  },
  btnCardAdd: {
    backgroundColor: white
  },
  btnCardQuiz: {
    backgroundColor: black
  }
})

const mapStateToProps = (state) => {
  //console.log(':::::mapStateToProps::DECKVIEW::deck::' + JSON.stringify(state.decks.deck))
  return { 
          deck: state.decks.deck,
          decks: state.decks.decks,
          isLoading: state.isLoading,
          hasError: state.hasError,
        }
 }

const mapDispatchToProps = dispatch => {
  return {
    getDeck: (deckName) => dispatch(fetchDeck(deckName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckView)