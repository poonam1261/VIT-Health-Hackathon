import PushNotification from "react-native-push-notification";

class NotificationService {
  configure = () => {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
      },
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    // Ensure a notification channel is created for Android
    PushNotification.createChannel(
      {
        channelId: "alarm-channel",
        channelName: "Alarm Notifications",
        channelDescription: "A channel for alarm notifications",
        soundName: "default",
        importance: 4, // HIGH priority
        vibrate: true,
      },
      (created) => console.log(`Channel created: ${created}`)
    );
  };
}

export default new NotificationService();
