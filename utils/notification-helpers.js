import {Notifications, Permissions} from 'expo'
import {AsyncStorage} from "react-native";

const NOTIFICATION_KEY = 'UCard:notifications';

function createNotification() {
    return {
        title: 'Take a quiz!',
        body: "Don't forget to study!",
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

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

// Used to test notifications
export function sendNotification(notificationContent) {
    return Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({status}) => {
            if (status === 'granted') {
                Notifications.presentLocalNotificationAsync({
                    title: notificationContent.title,
                    body: notificationContent.body
                })
            }
        })
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(10);
                            tomorrow.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            );

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                        }
                    })
            }
        })
}
