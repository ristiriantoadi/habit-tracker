importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyC5nysv5GeFqjMvpDHAyCv7zHRyO1Mubwk",
  authDomain: "habit-tracker-d6a77.firebaseapp.com",
  projectId: "habit-tracker-d6a77",
  storageBucket: "habit-tracker-d6a77.appspot.com",
  messagingSenderId: "696586132868",
  appId: "1:696586132868:web:20aca16562d26430d7d1d1",
  measurementId: "G-LYY8R3QWQ6",
});

const messaging = firebase.messaging();
