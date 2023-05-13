import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfghNLdg-DnYYb2zGCdIkIcReRxQr6vzY",
  authDomain: "react-asm02.firebaseapp.com",
  projectId: "react-asm02",
  storageBucket: "react-asm02.appspot.com",
  messagingSenderId: "407799661831",
  appId: "1:407799661831:web:e4209b9e1fd7af084a71a2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
