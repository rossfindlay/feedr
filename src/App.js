import React, { Component } from 'react';
import './css/App.css';
import './css/html5bp.css'
import './css/normalize.css'
import Header from './Header'
import Article from './Article'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Header/>
          <div className="loader" style={{display: "none"}}></div>
          <div className="popUp" style={{display: "none"}}>
            <a href="#" className="closePopUp">X</a>
            <div className="container">
              <h1>Article title here</h1>
              <p>
                Article description/content here.
              </p>
              <a href="#" className="popUpAction" target="_blank">Read more from source</a>
            </div>
          </div>
          <section id="main" className="container">
            <Article />
            <Article />
            <Article />
            <Article />

          </section>
        </div>
      </div>
    );
  }
}

export default App;
