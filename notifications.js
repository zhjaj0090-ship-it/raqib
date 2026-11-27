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

function showTokenBox(token) {
  const oldBox = document.getElementById("fcm-token-modal");
  if (oldBox) oldBox.remove();

  const box = document.createElement("div");
  box.id = "fcm-token-modal";
  box.style.cssText = `
    position: fixed;
    inset: 16px;
    z-index: 9999;
    background: #082f27;
    color: #fff;
    border-radius: 16px;
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.45);
    max-height: 70vh;
    margin: auto;
  `;

  box.innerHTML = `
    <strong style="font-size:16px;">تم تفعيل الإشعارات بنجاح</strong>
    <p style="margin:0;font-size:13px;opacity:0.85;">انسخ الرمز التالي لتجربة إرسال رسالة من Firebase:</p>
    <textarea id="fcm-token-text" readonly style="width:100%;height:110px;border-radius:10px;padding:10px;font-size:12px;color:#111;background:#f4f7f6;">${token}</textarea>
    <div style="display:flex;gap:10px;">
      <button id="copy-fcm-token" style="flex:1;padding:10px;border:none;border-radius:10px;background:#10b981;color:#fff;font-weight:bold;">نسخ الرمز</button>
      <button id="close-fcm-token" style="padding:10px 16px;border:none;border-radius:10px;background:#374151;color:#fff;">إغلاق</button>
    </div>
  `;

  document.body.appendChild(box);

  document.getElementById("copy-fcm-token").addEventListener("click", async () => {
    const textarea = document.getElementById("fcm-token-text");
    textarea.select();
    try {
      await navigator.clipboard.writeText(token);
      alert("تم نسخ الرمز!");
    } catch {
      document.execCommand("copy");
      alert("تم تحديد الرمز، اضغط نسخ");
    }
  });

  document.getElementById("close-fcm-token").addEventListener("click", () => {
    box.remove();
  });
}

async function ensureServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    throw new Error("المتصفح لا يدعم Service Worker");
  }

  const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
    scope: "/"
  });

  await navigator.serviceWorker.ready;
  return registration;
}

export async function activateNotifications() {
  try {
    if (!("Notification" in window)) {
      alert("المتصفح الحالي لا يدعم الإشعارات");
      return null;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("لم يتم السماح بالإشعارات");
      return null;
    }

    const registration = await ensureServiceWorker();

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration
    });

    if (token) {
      showTokenBox(token);
    } else {
      alert("لم يتم استلام رمز الجهاز");
    }
    return token;
  } catch (err) {
    alert("حصل خطأ: " + (err?.message || err));
    return null;
  }
}

onMessage(messaging, (payload) => {
  new Notification(payload.notification?.title || "تذكير رقيب", {
    body: payload.notification?.body || ""
  });
});
