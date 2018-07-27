import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput, KeyboardAvoidingView, Dimensions } from 'react-native'

import  { gray,black,blue,purple,white } from '../utils/colors'
import { setNewDeck } from '../utils/api'

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


class NewDeck extends Component {
  state = {
    deckName: ''
  }

  submit = () => {
    //alert('10 bulls')
    let deck_data = {}
    let titleName = this.state.deckName
    if(titleName !== undefined && titleName !== '') {
      deck_data[titleName] = {title: titleName, questions: []}
      setNewDeck(deck_data)
      this.setState({deckName: ''})
      this.props.navigation.navigate('Decks')
    }
    
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Text style={{ fontSize: 24, marginBottom: 5 }}>What is the title of your new deck?</Text>     
          <TextInput style={styles.deckTitleInput} 
                     value={this.state.deckName} 
                     onChangeText={(text) => this.setState({deckName: text})} />  
          <SubmitBtn onPress={this.submit} />
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

export default NewDeck