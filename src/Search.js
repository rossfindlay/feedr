import React, { Component } from 'react'
import searchImg from './images/search.png'

class Search extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  state = {
    text: ''
  }

  handleClick() {
    this.props.onShowSearch()
  }

  handleChange(e) {
    this.setState({
      text: e.target.value
    })
    this.props.onTextChange(e.target.value)
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.onEnterKey()
    }
  }

  render() {
    return (
      <section id={"search" + (this.props.showSearch ? '.active' : '')}>
        <input
          type="text"
          name="name"
          value={this.state.text}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <a><img src={searchImg} alt="" onClick={this.handleClick}/></a>
      </section>
    )
  }
}

export default Search
