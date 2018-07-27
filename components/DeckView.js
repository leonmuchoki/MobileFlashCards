import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import  { gray,black,blue,lightPurp,white } from '../utils/colors'
import { connect } from 'react-redux';
import { fetchDeck } from '../actions/index';

class DeckView extends Component {

  componentDidMount(){
    const { title } =  this.props.navigation.state.params
    //alert(JSON.stringify(decks))
    this.props.getDeck(title)
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
    const { title, questions, decks } = this.props.navigation.state.params
    const deck = this.props.deck
    const deckData = deck
    let cardCount
    if (deck !== undefined) {
      //alert(JSON.stringify(deckData[0]["title"]))
      cardCount = deckData[0]["questions"].length
    }
     
    //alert(JSON.stringify(decks))

    return (
      <View style={styles.container}>
        {deck !== undefined && 
          <View>
          <Text style={styles.deckTitle}>{deckData[0]["title"]}</Text>
          <Text style={styles.deckCount}>{cardCount} cards</Text>
          <View style={{marginTop: 150}}>
            <TouchableOpacity style={[styles.btnCards, styles.btnCardAdd]} onPress={() => this.addDeckCard(deckData[0]["title"])}>
              <Text style={{fontSize: 25}}>Add Card</Text>
            </TouchableOpacity>
            { deckData[0]["questions"] !== undefined && deckData[0]["questions"].length > 0 
              ? <TouchableOpacity style={[styles.btnCards, styles.btnCardQuiz]} onPress={() => this.startQuiz(deckData[0]["title"],cardCount)}>
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
  console.log('mapStateToProps::DECKVIEW::' + JSON.stringify(state.decks.deck))
  return { 
          deck: state.decks.deck
        }
 }

const mapDispatchToProps = dispatch => {
  return {
    getDeck: (deckName) => dispatch(fetchDeck(deckName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckView)