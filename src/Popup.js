import React, { Component } from 'react'

class Popup extends Component {

  render() {
    if(this.props.showPopup) {
      return (
        <div className="popUp">
          <a href="#" className="closePopUp">X</a>
          <div className="container">
            <h1>Article title here</h1>
            <p>
              Article description/content here.
            </p>
            <a href="#" className="popUpAction" target="_blank">Read more from source</a>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default Popup
