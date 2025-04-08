import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBxO_iCEiXDTdg_90bUkvqv6S4a3Mk9070",
  authDomain: "redzone-topup-852a2.firebaseapp.com",
  projectId: "redzone-topup-852a2",
  storageBucket: "redzone-topup-852a2.firebasestorage.app",
  messagingSenderId: "209606560486",
  appId: "1:209606560486:web:d12baa8545d99adad14927",
  measurementId: "G-T1WWTKDY79"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
getAnalytics(app);

window.checkIfUserSpun = async (username, monthKey) => {
  const q = query(
    collection(db, "winners"),
    where("username", "==", username),
    where("month", "==", monthKey)
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty;
};

window.saveResultToFirebase = async (username, prize, monthKey) => {
  try {
    await addDoc(collection(db, "winners"), {
      username,
      prize,
      month: monthKey,
      timestamp: new Date().toISOString()
    });
    console.log("บันทึกผลสำเร็จ");
  } catch (e) {
    console.error("เกิดข้อผิดพลาด:", e);
  }
};

window.loadWinners = async () => {
  const winnerList = document.getElementById("winner-list");
  if (!winnerList) return;

  const q = query(collection(db, "winners"), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);

  winnerList.innerHTML = "";
  snapshot.forEach((doc) => {
    const data = doc.data();
    const li = document.createElement("li");
    li.innerHTML = `<strong>${data.username}</strong> ได้รับ <span style="color:#00ffae">${data.prize}</span>`;
    winnerList.appendChild(li);
  });
};

window.addEventListener("load", loadWinners);
