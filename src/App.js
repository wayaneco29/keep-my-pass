import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';

import './App.css';
import 'antd/dist/antd.css';
import "react-sliding-pane/dist/react-sliding-pane.css";

import firebase, { firebaseAuth } from './firebase';

const PrivateRoute = ({ user, children, ...props }) => {

  if (user) {
  return <Redirect to="/menu" />
  }
  
  return <Route {...props}>{children}</Route>
}

function App() {

  const [currentUser, setCurrentUser] = React.useState(null);
  const [showSlide, setShowSlide] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleLoginShow = (bool) => setIsLogin(bool);
  const handleToggleShow = () => setShowSlide(!showSlide);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
  
      const provider = new firebase.auth.GoogleAuthProvider();

      const  { user } = await firebaseAuth.signInWithPopup(provider);

      setCurrentUser(user);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  const handleSignIn = async (credentials) => {
    try {
      setLoading(true);

      const { email, password } = credentials;

      const user = await firebaseAuth.signInWithEmailAndPassword(email, password);

      setCurrentUser(user);

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const handleRegister = async (credentials) => {
    try {
      setLoading(true);

      const { email, password, name } = credentials;

      await firebaseAuth.createUserWithEmailAndPassword(email, password);

      await firebaseAuth.currentUser.updateProfile({ displayName: name });

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(null);
      }
    })
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute user={currentUser} path="/" exact>
            <Homepage 
              isLogin={isLogin} 
              show={showSlide} 
              handleLoginShow={handleLoginShow} 
              handleToggleShow={handleToggleShow}
              handleSignIn={handleSignIn}
              handleGoogleSignIn={handleGoogleSignIn}
              handleRegister={handleRegister}
            />
          </PrivateRoute>
          <Route user={currentUser} path="/menu">
            <Dashboard user={currentUser} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}


export default App;
