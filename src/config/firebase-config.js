import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB9dhkNN2sVyOZfdBLAN7LJmYQqkolxf80",
  authDomain: "my-expense-tracker-76211.firebaseapp.com",
  projectId: "my-expense-tracker-76211",
  storageBucket: "my-expense-tracker-76211.appspot.com",
  messagingSenderId: "826162937436",
  appId: "1:826162937436:web:d491a9ab404c9749a33099",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
// const auth = getAuth(app);
// export { app, auth };
