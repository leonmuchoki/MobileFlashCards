import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import  { gray,black,blue,red,white } from '../utils/colors'

class Quiz extends Component {

  showAnswer = (deckName) => {
    //this.props.navigation.navigate('QuestionView', {deckName: deckName})
  }


  render() {
    const { deckName, cardCount, questions } = this.props.navigation.state.params
    let qstns = questions[0]
    let count_qstns = qstns.length
    alert(JSON.stringify(questions))
    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>{qstns[0].question} ?</Text>
        <Text style={styles.deckCount}>{count_qstns} / {count_qstns}</Text>
        <View style={{marginTop: 150}}>
          <TouchableOpacity style={[styles.btnCards, styles.btnCardCorrect]} onPress={() => this.showAnswer(deckName)}>
            <Text style={{fontSize: 25}}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnCards, styles.btnCardInCorrect]} onPress={() => this.showAnswer(deckName)}>
            <Text style={{fontSize: 25, color: white}}>Incorrect</Text>
          </TouchableOpacity>
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
  btnCardCorrect: {
    backgroundColor: "green"
  },
  btnCardInCorrect: {
    backgroundColor: red
  }
})

export default Quiz