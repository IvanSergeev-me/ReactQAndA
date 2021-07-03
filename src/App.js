
import React from 'react';
import './App.css';
import Header from './Components/Header/Header.jsx';
import Main from './Components/Main/Main.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Login from './Components/EnterPages/Login/Login.jsx';
import {Route} from "react-router-dom";



class App extends React.Component {
  constructor(props) {
    super(props);

};
  render =() =>{
    return (
      <div className="App">
       
        <Header />
        <Main />
        <Footer />
      </div>
  );
  }
}

export default App;