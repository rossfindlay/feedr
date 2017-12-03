import React, { Component } from 'react'
import searchImg from './images/search.png'

class Search extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleClick() {
    this.props.onShowSearch()
  }

  handleChange(e) {
    this.props.onTextChange(e.target.value)
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.onEnterKey()
    }
  }
  // Great handling of input!

  render() {
    return (
      <div className="searchContainer">
      <section id="search" className={this.props.showSearch ? 'active' : ''}>
        <input
          type="text"
          name="name"
          value={this.props.searchText}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <a><img id="searchImage" src={searchImg} alt="" onClick={this.handleClick}/></a>
      </section>
    </div>
    )
  }
}

export default Search
