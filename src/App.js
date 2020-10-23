import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';



import './App.css';
import 'antd/dist/antd.css';
import "react-sliding-pane/dist/react-sliding-pane.css";




function App() {
  const [showSlide, setShowSlide] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);

  const handleLoginShow = (bool) => setIsLogin(bool);
  const handleToggleShow = () => setShowSlide(!showSlide);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Homepage 
              isLogin={isLogin} 
              show={showSlide} 
              handleLoginShow={handleLoginShow} 
              handleToggleShow={handleToggleShow} 
            />
          </Route>
          <Route path="/menu">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
