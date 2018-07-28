import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import  { gray,black,blue,red,white, lightPurp } from '../utils/colors'
import { getDeck } from '../utils/api'
import { fetchDeck } from '../actions/index';

const NOTIFICATION_KEY = 'FlashCards:notifications'

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
    this.props.getDeck(deckName)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.deck !== this.props.deck) {
      this.updateStateData()
    }
  }

  updateStateData = () => {
    const deck = this.props.deck
    let questions 
    if (deck !== undefined) {
      questions = deck.questions
      let questionsCount = questions.length
      this.setState({questions: questions, questionsCount: questionsCount, currentQuestionNo: 1})
    } 
  }

  getDeckQuestions = () =>{
    const deck = this.props.deck
    let questions 
    if (deck !== undefined) {
      return questions
    } 
    return []
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
      // update quiz taken today to avoid sending notifaction
      const quizNotif = {
        isQuizTaken: true,
        todayDate: new Date()
      }

      AsyncStorage.mergeItem(NOTIFICATION_KEY, JSON.stringify(quizNotif))
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
    //const { deckName, cardCount, questions } = this.props.navigation.state.params
    //const questions = this.getDeckQuestions()
    let { questions, currentQuestionNo, viewAnswer, questionsCount, 
         countCorrect, isLastQuestion} = this.state
    let qstns 
    let count_qstns
    if (questions !== undefined) {
      qstns = questions[currentQuestionNo-1]
      count_qstns = questions.length
    }

    //console.log('----questions---' + JSON.stringify(questions))
    return (
      <View style={styles.container}>
        { questions === undefined ?
          <View>
            <Text>loading...please wait</Text>
          </View>
          : 
          <View>
            { isLastQuestion === true
              ? <View>
                  <View style={styles.scoreView}>
                    <Text style={{textAlign: 'center', fontSize: 23}}>Score</Text>
                    <Text style={styles.scoreViewText}> {countCorrect} / {questionsCount}</Text>
                  </View>
                  <TouchableOpacity style={[styles.btnCards2, styles.btnCardRestart]} onPress={() => this.restartQuiz()}>
                    <Text style={{fontSize: 25}}>Restart Quiz</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.btnCards2, styles.btnCardGoBack]} onPress={() => this.goBackToDeck()}>
                    <Text style={{fontSize: 25,color: white}}>Back to deck</Text>
                  </TouchableOpacity>
                </View> 
              :
                <View>
                  <View style={styles.deckCount}>
                    <Text style={styles.deckCountText}>
                      {currentQuestionNo} / {count_qstns}
                    </Text>
                  </View>
                  {qstns !== undefined &&
                    <View style={styles.viewQuestions}>
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
              
            }
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
  scoreView: {
    padding: 20
  },
  scoreViewText: {
    color: lightPurp,
    textAlign: 'center',
    fontSize: 35,
    fontWeight: "500"
  },
  deckQuestion: {
    fontSize: 35,
    textAlign: 'center',
    color: blue
  },
  viewQuestions: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  deckCount: {
    marginBottom: 20,
    alignSelf: 'flex-start'
  },
  deckCountText: {
    fontSize: 25,
    color: black,
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

const mapStateToProps = (state) => {
  //console.log(':::::mapStateToProps::Quiz::deck::' + JSON.stringify(state.decks.deck))
  return { 
          deck: state.decks.deck,
          isLoading: state.isLoading,
          hasError: state.hasError,
        }
 }

const mapDispatchToProps = dispatch => {
  return {
    getDeck: (deckName) => dispatch(fetchDeck(deckName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)