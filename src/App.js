import React, { useState, useEffect } from "react";
import "./App.css";
import { UserContext } from "./context/userContext.js";

import { app } from "./config/firebase-config.js";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// react-router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//toast stuff
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// pages
import HomePage from "./home/HomePage.js";
import SignIn from "./account/signIn.js";
import SignUp from "./account/signUp.js";
import PageNotFound from "./utils/NotFound.js";
import Footer from "./footer/footer.js";
import Header from "./header/header.js";
import User from "./account/user.js";
import AboutPage from "./utils/AboutPage.js";
import Tasks from "./tasks/task.js";

function App() {
   const [user, setUser] = useState(null);
   const auth = getAuth(app);

   useEffect(() => {
     setPersistence(auth, browserLocalPersistence)
       .then(() => {})
       .catch((error) => {
         console.error("Error setting session persistence:", error);
       });
   }, [auth]);

     return (
       <Router>
         <ToastContainer />
         <UserContext.Provider value={{ user, setUser }}>
               <Header />
               <Routes>
                 <Route exact path="/" element={<HomePage />} />
                 <Route exact path="/signin" element={<SignIn />} />
                 <Route exact path="/signup" element={<SignUp />} />
                 <Route exact path="/user" element={<User />} />
                 <Route exact path="/tasks" element={<Tasks/>}/>
                 <Route exact path="/about" element={<AboutPage />} />
                 <Route exact path="*" element={<PageNotFound />} />
               </Routes>
               <Footer />
         </UserContext.Provider>
       </Router>
     );
}

export default App;
