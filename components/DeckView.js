import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import  { gray,black,blue,lightPurp,white } from '../utils/colors'

class DeckView extends Component {

  componentDidMount(){
    const { decks } =  this.props.navigation.state.params
    //alert(JSON.stringify(decks))
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
    const { title, cardCount,questions } = this.props.navigation.state.params
    const { decks } =  this.props.navigation.state.params
    alert(JSON.stringify(decks))

    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>{title}</Text>
        <Text style={styles.deckCount}>{cardCount} cards</Text>
        <View style={{marginTop: 150}}>
          <TouchableOpacity style={[styles.btnCards, styles.btnCardAdd]} onPress={() => this.addDeckCard(title)}>
            <Text style={{fontSize: 25}}>Add Card</Text>
          </TouchableOpacity>
          { questions !== undefined && questions.length > 0 
            ? <TouchableOpacity style={[styles.btnCards, styles.btnCardQuiz]} onPress={() => this.startQuiz(title,cardCount)}>
                <Text style={{fontSize: 25, color: white}}>Start Quiz</Text>
              </TouchableOpacity>
            : <TouchableOpacity style={[styles.btnCards, styles.btnCardQuiz]} onPress={this.alertNoQuestion}>
                <Text style={{fontSize: 25, color: white}}>Start Quiz</Text>
              </TouchableOpacity>
          }
          
        </View>
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

export default DeckView