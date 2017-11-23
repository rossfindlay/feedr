import React, { Component } from 'react'
import Source from './Source'
import Search from './Search'

class Header extends Component {
  constructor(props) {
    super(props)

    this.handleSelectFeedHeader = this.handleSelectFeedHeader.bind(this)
    this.handleShowSearch = this.handleShowSearch.bind(this)
    this.handleEnterKey = this.handleEnterKey.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  handleSelectFeedHeader(name) {
    this.props.onSelectFeed(name)
  }

  handleShowSearch() {
    this.props.onShowSearchApp()
  }

  handleEnterKey() {
    this.props.onEnterKeyApp()
  }

  handleTextChange(text) {
    this.props.onTextChangeApp(text)
  }

  render() {
    return (
      <div>
        <header>
          <section className="container">
            <a href="#"><h1>Feedr</h1></a>
            <nav className="navBar">
              <Source
                selectedFeed={this.props.selectedFeed}
                availableFeeds={this.props.availableFeeds}
                onSelectFeed={this.handleSelectFeedHeader}
              />
              <Search
                showSearch={this.props.showSearch}
                onShowSearch={this.handleShowSearch}
                onEnterKey={this.handleEnterKey}
                onTextChange={this.handleTextChange}
              />
            </nav>
            <div className="clearfix"></div>
          </section>
        </header>
      </div>

    )
  }
}

export default Header
