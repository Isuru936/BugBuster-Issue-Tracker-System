import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";

import "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "issue-tracker-9b307.firebaseapp.com",
  projectId: "issue-tracker-9b307",
  storageBucket: "issue-tracker-9b307.appspot.com",
  messagingSenderId: "584654898170",
  appId: "1:584654898170:web:212e04b33bcb67084f1a43",
  measurementId: "G-38XF2R1QD0",
};

firebase.initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
