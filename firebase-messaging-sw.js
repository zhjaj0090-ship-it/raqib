importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCxdosAo13AlLiDiAW6FSe8N_aIqoqnSJ_4",
  authDomain: "raqeb-95ca6.firebaseapp.com",
  projectId: "raqeb-95ca6",
  storageBucket: "raqeb-95ca6.firebasestorage.app",
  messagingSenderId: "607892658555",
  appId: "1:607892658555:web:96dfe6611aab3667d085de",
  measurementId: "G-N7BVTLYDBD"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "تذكير رقيب";
  const options = {
    body: payload.notification?.body || "لا تنسَ ذكر الله والصلاة",
    icon: "/icon.png"
  };
  self.registration.showNotification(title, options);
});
