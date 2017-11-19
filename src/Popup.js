import React, { Component } from 'react'

class Popup extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onClosePopup()
  }

  render() {
    if(this.props.showPopup) {
      return (
        <div className="popUp">
          <a href="#" className="closePopUp" onClick={this.handleClick}>X</a>
          <div className="container">
            <h1>{this.props.popupTitle}</h1>
            <p>
              {this.props.popupContent}
            </p>
            <a href={this.props.popupUrl} className="popUpAction" target="_blank">Read more from source</a>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default Popup
