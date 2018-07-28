import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'FlashCards:notifications'

export function getDailyReminderValue () {
  return {
    today: "👋 Don't forget to take your quiz!"
  }
}

export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Take Quiz!',
    body: "👋 don't forget to take your quiz!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification (notifTime) {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        // no notification has been setup
        scheduleNotification()
      } else {
        // notification already setup
        // check if quiz is taken today
        let is_qz_taken = data.isQuizTaken
        if (is_qz_taken === false) {
          scheduleNotification()
        }
      }
    })
}

function scheduleNotification(notifTime) {
  Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              
              //today.setTime(today.getTime() + 1000 * 60);
              console.log('set tomorrow...' + notifTime)
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: notifTime,
                  repeat: 'day',
                }
              )
              .then(id => console.info(`Delayed notification scheduled (${id}) at ${notifTime}`))
              .catch(err => console.error(err))

              const quizNotif = {
                isQuizTaken: false,
                todayDate: notifTime
              }

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(quizNotif))
            }
          })
}

export function sendImmediateNotification () {
  const localNotification = {
    title: 'Flash Cards',
    body: "👋 Don't forget to take your quiz!",
    data: { test: 'value' }
  }

  console.log('Scheduling immediate notification:', { localNotification })

  Notifications.presentLocalNotificationAsync(localNotification)
    .then(id => console.info(`Immediate notification scheduled (${id})`))
    .catch(err => console.error(err))
}
