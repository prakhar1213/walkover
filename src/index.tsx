import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { AppProvider } from "./AppContext";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const firebaseConfig = {
  apiKey: "AIzaSyAgkhWxGE-VQFYAARxbheU7Ij6-0e-ni0s",
  authDomain: "walkover-tables.firebaseapp.com",
  projectId: "walkover-tables",
  storageBucket: "walkover-tables.appspot.com",
  messagingSenderId: "555826105644",
  appId: "1:555826105644:web:0ebab6427e7c11515e3089",
  measurementId: "G-EDNRW6KG1T",
};
initializeApp(firebaseConfig);
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <App />
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
