import React, { Component } from 'react'
import searchImg from './images/search.png'
import Source from './Source'

class Header extends Component {
  constructor(props) {
    super(props)

    this.handleSelectFeedHeader = this.handleSelectFeedHeader.bind(this)
  }

  handleSelectFeedHeader(name) {
    this.props.onSelectFeed(name)
  }

  render() {
    return (
      <div>
        <header>
          <section className="container">
            <a href="#"><h1>Feedr</h1></a>
            <nav>
              <Source
                selectedFeed={this.props.selectedFeed}
                availableFeeds={this.props.availableFeeds}
                onSelectFeed={this.handleSelectFeedHeader}
              />
              <section id="search">
                <input type="text" name="name" value="" />
                <a href="#"><img src={searchImg} alt="" /></a>
              </section>
            </nav>
            <div className="clearfix"></div>
          </section>
        </header>
      </div>

    )
  }
}

export default Header
