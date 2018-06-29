import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import  { gray,black,blue,red,white } from '../utils/colors'

class Quiz extends Component {

  state = {
    questions: [],
    questionsCount: 0,
    currentQuestionNo: 0,
    viewAnswer: false
  }

  componentDidMount() {
    const {questions} = this.props.navigation.state.params
    let questionsCount = questions.length
    this.setState({questions: questions, questionsCount: questionsCount, currentQuestionNo: 0})
  }

  showAnswer = (deckName) => {
    const { questionsCount, currentQuestionNo } = this.state
    let newQuestionNo = 0
    if (currentQuestionNo < questionsCount) {
      newQuestionNo = currentQuestionNo + 1
    } else {
      newQuestionNo = questionsCount - 1
    }
    this.setState({viewAnswer: true, currentQuestionNo: newQuestionNo})
  }

  nextQuestion = () => {
    this.setState({viewAnswer: false})
  }


  render() {
    const { deckName, cardCount, questions, questionsCount } = this.props.navigation.state.params
    let { currentQuestionNo, viewAnswer} = this.state
    let qstns = questions[currentQuestionNo]
    let count_qstns = questions.length
    alert(JSON.stringify(questions))
    return (
      <View style={styles.container}>
        <Text style={styles.deckCount}>
          {currentQuestionNo + 1} / {count_qstns}
        </Text>
        {viewAnswer === false 
          ? <View>
              <Text style={styles.deckQuestion}>{qstns.question}</Text>
              <Text style={{fontSize: 25, color: red}}>{qstns.answer}</Text>
              <View style={{marginTop: 150}}>
                <TouchableOpacity style={[styles.btnCards, styles.btnCardCorrect]} onPress={() => this.showAnswer(deckName)}>
                  <Text style={{fontSize: 25}}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnCards, styles.btnCardInCorrect]} onPress={() => this.showAnswer(deckName)}>
                  <Text style={{fontSize: 25, color: white}}>Incorrect</Text>
                </TouchableOpacity>
              </View>
            </View>
          : <View>
              <Text style={{fontSize: 35}}>Yes!</Text>
              <Text style={{fontSize: 25, color: red}}>{qstns.question}</Text>
              <TouchableOpacity style={[styles.btnCards, styles.btnCardInCorrect]} onPress={this.nextQuestion}>
                <Text style={{fontSize: 25, color: white}}>Next</Text>
              </TouchableOpacity>
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
  deckQuestion: {
    fontSize: 35,
    textAlign: 'center',
    color: blue
  },
  deckCount: {
    fontSize: 25,
    textAlign: 'center',
    color: black,
    marginTop: 10,
    alignSelf: 'flex-start', 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start'
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