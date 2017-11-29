import React, { Component } from 'react'
import moment from 'moment'

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
          <a className="closePopUp" onClick={this.handleClick}>X</a>
          <div className="container">
            <h1>{this.props.popupData.title}</h1>
            <img className="popUpImage" alt="" src={this.props.popupData.image}/>
            <p>
              {this.props.popupData.content}
            </p>
            <p>
              Published: {moment(this.props.popupData.date).format("dddd, MMMM Do YYYY h:mm a")}
            </p>
            <a href={this.props.popupData.url} className="popUpAction" target="_blank">Read more from source</a>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default Popup
