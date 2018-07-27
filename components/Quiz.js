import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import  { gray,black,blue,red,white } from '../utils/colors'
import { getDeck } from '../utils/api'

class Quiz extends Component {

  state = {
    questions: [],
    questionsCount: 0,
    currentQuestionNo: 1,
    viewAnswer: false,
    goToNextQuestion: false,
    countCorrect: 0,
    isLastQuestion: false
  }

  componentDidMount() {
    const { questions, deckName } = this.props.navigation.state.params
    let decks = []
    getDeck(deckName).then((response)=>{
      decks.push(response)
      alert(JSON.stringify(response))
      let questionsCount = response.questions.length
      this.setState({questions: response.questions, questionsCount: questionsCount, currentQuestionNo: 1})
    })
  }

  showAnswer = () => {
    this.setState({viewAnswer: true})
  }

  markCorrect = (bool) => {
    const { questionsCount, currentQuestionNo, countCorrect ,isLastQuestion} = this.state
    let count_correct = countCorrect
    bool === true && (count_correct = count_correct + 1)

    let newQuestionNo = 0
    let boolIsLast = false
    if (currentQuestionNo < questionsCount) {
      newQuestionNo = currentQuestionNo + 1
    } else {
      newQuestionNo = questionsCount
      boolIsLast = true
    }
    this.setState({currentQuestionNo: newQuestionNo,viewAnswer: false, countCorrect: count_correct, isLastQuestion: boolIsLast})
  }

  nextQuestion = () => {
    this.setState({viewAnswer: false})
  }

  goBackToDeck = () => {
    this.props.navigation.navigate('Decks')
  }

  restartQuiz = () => {
    this.setState({
      currentQuestionNo: 1,
      viewAnswer: false,
      goToNextQuestion: false,
      countCorrect: 0,
      isLastQuestion: false
    })
  }


  render() {
    const { deckName, cardCount, questions } = this.props.navigation.state.params
    let { currentQuestionNo, viewAnswer, questionsCount, countCorrect, isLastQuestion} = this.state
    let qstns = questions[currentQuestionNo-1]
    let count_qstns = questions.length
    //alert(JSON.stringify(qstns))
    return (
      <View style={styles.container}>
        <Text style={styles.deckCount}>
          {currentQuestionNo} / {count_qstns}
        </Text>
        { isLastQuestion === true
          ? <View>
              <Text>You got {countCorrect} / {questionsCount}</Text>
              <TouchableOpacity style={[styles.btnCards2, styles.btnCardRestart]} onPress={() => this.restartQuiz()}>
                <Text style={{fontSize: 25}}>Restart Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnCards2, styles.btnCardGoBack]} onPress={() => this.goBackToDeck()}>
                <Text style={{fontSize: 25,color: white}}>Back to deck</Text>
              </TouchableOpacity>
            </View> 
          :
            <View>
              <Text style={styles.deckQuestion}>{qstns.question}</Text>
              { viewAnswer === false 
                ?
                <TouchableOpacity style={{margin: 0}} onPress={this.showAnswer}>
                    <Text style={{fontSize: 25, color: 'blue'}}>Show Answer</Text>
                </TouchableOpacity>
                :
                 <Text style={{fontSize: 25, color: red}}>{qstns.answer}</Text>
              }
              
              <View style={{marginTop: 150}}>
                <TouchableOpacity style={[styles.btnCards, styles.btnCardCorrect]} onPress={() => this.markCorrect(true)}>
                  <Text style={{fontSize: 25}}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnCards, styles.btnCardInCorrect]} onPress={() => this.markCorrect(false)}>
                  <Text style={{fontSize: 25, color: white}}>Incorrect</Text>
                </TouchableOpacity>
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
    marginLeft: 25,
    marginRight: 25
  },
  btnCardCorrect: {
    backgroundColor: "green"
  },
  btnCardInCorrect: {
    backgroundColor: red
  },
  btnCards2: {
    marginTop: 15,
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    height: 65,
    borderRadius: 2,
  },
  btnCardRestart: {
    backgroundColor: white
  },
  btnCardGoBack: {
    backgroundColor: black
  }
})

export default Quiz