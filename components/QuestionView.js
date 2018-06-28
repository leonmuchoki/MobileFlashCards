import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput, KeyboardAvoidingView, Dimensions } from 'react-native'

import  { gray,black,blue,purple,white } from '../utils/colors'
import { addCardToDeck } from '../utils/api'

const window = Dimensions.get('window');

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}


class QuestionView extends Component {
  state = {
    deckQuestion: '',
    deckAnswer: ''
  }

  submit = (deckName) => {
    //alert('10 bulls ' + deckName)
    let deck_data = {}
    let title = this.state.deckQuestion
    let new_card = {question: this.state.deckQuestion, answer: this.state.deckAnswer}
    //deck_data[deckName] = {title: deckName, questions: question}
    addCardToDeck(deckName,new_card)
    this.setState({deckQuestion: '', deckAnswer: ''})
    this.props.navigation.navigate('DeckView')
  }

  render() {
    const { deckName } = this.props.navigation.state.params

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Text style={{ fontSize: 24, marginBottom: 5 }}> Question:</Text>     
          <TextInput style={styles.deckTitleInput} 
                     value={this.state.deckQuestion} 
                     onChangeText={(text) => this.setState({deckQuestion: text})} />
          <Text style={{ fontSize: 24, marginBottom: 5 }}> Answer:</Text>   
          <TextInput style={styles.deckTitleInput} 
                     value={this.state.deckAnswer} 
                     onChangeText={(text) => this.setState({deckAnswer: text})} /> 
          <SubmitBtn onPress={() => this.submit(deckName)} />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45
  },
  AndroidSubmitBtn: {
    marginBottom:20, 
    width:window.width -100,
    alignItems:'center',
    justifyContent:'center',
    height:50,
    backgroundColor: purple,
    borderRadius: 5
  },
  deckTitleInput: {
    height: 50,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    fontSize: 25,
   // paddingVertical: 5,
    // paddingHorizontal: 15,
    width: window.width - 50,
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
})

export default QuestionView