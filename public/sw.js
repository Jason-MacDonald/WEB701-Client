self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  
  let data;

  if (event.data) {
    console.log('This push event has data: ', event.data.json());
    data = event.data.json().notification;
  } else {
    console.log('This push event has no data.');
  }
  
  console.log(data.title);

  // Test content displayed in notification.
  const title = data.title;
  const options = {
    body: data.body,
    //icon: 'images/icon.png',
    //badge: 'images/badge.png'
  };

  console.log("data");

  event.waitUntil(self.registration.showNotification(title, options));
});

// ##### NOTIFICATION CLICK HANDLER #####
// Called when a user clicks on the displayed notification.
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click received.');
  
  //Closes the notification dialog.
  event.notification.close();
  
  // Opens a new window. TODO: Change to public address of app.
  event.waitUntil(
    clients.openWindow('https://developers.google.com/web')
  );
});