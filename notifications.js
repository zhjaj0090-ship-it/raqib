import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyCxdosAo13AlLiDiAW6FSe8N_aIqoqnSJ_4",
  authDomain: "raqeb-95ca6.firebaseapp.com",
  projectId: "raqeb-95ca6",
  storageBucket: "raqeb-95ca6.firebasestorage.app",
  messagingSenderId: "607892658555",
  appId: "1:607892658555:web:96dfe6611aab3667d085de",
  measurementId: "G-N7BVTLYDBD"
};

const VAPID_KEY = "BABwtzVMqmY8iM_G20t_prpcsqrA9FmMoSwKmvRLAxBxIyU10ptVkGtk7Zy8i0Etg8nib2LmJLpSBLW-rk3Ba0k";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export async function activateNotifications() {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    alert("لم يتم السماح بالإشعارات");
    return null;
  }

  const token = await getToken(messaging, { vapidKey: VAPID_KEY });
  console.log("FCM Token:", token);
  return token;
}

onMessage(messaging, (payload) => {
  new Notification(payload.notification?.title || "تذكير رقيب", {
    body: payload.notification?.body || ""
  });
});
