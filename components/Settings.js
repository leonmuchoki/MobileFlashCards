import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux';
import TimePicker from 'react-native-simple-time-picker';
import  { gray,black,blue,lightPurp,white } from '../utils/colors'
import { setLocalNotification, clearLocalNotification, sendImmediateNotification } from '../utils/helpers'

const NOTIFICATION_KEY = 'FlashCards:notifications'

class Settings extends Component {
  state = {
    selectedHours: 0,
    selectedMinutes: 0,
  }

  setNotif = () => {
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((res) => {
      if (res !== null) {
        // check if any quiz taken today
        console.log('----setNotif---' + JSON.stringify(res))
        if (res.isQuizTaken === false) {
          // schedule notifation
          let today = new Date()
          today.setDate(today.getDate())
          today.setHours(this.state.selectedHours)
          today.setMinutes(this.state.selectedMinutes)
        }
      } else {
        // set new notification
        setLocalNotification()
      }
    })

    
  } 

  render() {
    const { selectedHours, selectedMinutes } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.txt}>Select Notification time</Text>
        <Text style={{fontWeight: "bold", fontSize: 23}}>{selectedHours}:{selectedMinutes}</Text>
        <TimePicker
          style={styles.timePicker}
          selectedHours={selectedHours}
          selectedMinutes={selectedMinutes}
          onChange={(hours, minutes) => this.setState({ selectedHours: hours, selectedMinutes: minutes })}
        />

        <TouchableOpacity style={styles.btnSave} onPress={()=> this.setNotif()}>
          <Text style={styles.txt}>SAVE</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 28,
    fontWeight: "bold",
    color: lightPurp,
  },
  btnSave: {
    marginTop: 15,
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    height: 65,
    borderRadius: 2,
    backgroundColor: white,
  },
  timePicker: {
    backgroundColor: gray,
    width: 60
  },
})

export default Settings