import React, { Component } from 'react'

class Source extends Component {
  constructor(props) {
    super(props)

    this.handleSelectFeed = this.handleSelectFeed.bind(this)
  }

  handleSelectFeed(name) {
    this.props.onSelectFeed(name)
  }

  render() {
    return (
      <ul>
        <li><a>News Source: <span>{this.props.selectedFeed.name}</span></a>
          <ul>
              {this.props.availableFeeds.map(feed => {
                return (
                  <li
                    onClick={() => this.handleSelectFeed(feed.name)}
                    key={feed.name}

                  >
                    <a>{feed.name}</a>
                  </li>
                )
              })
            }
          </ul>
        </li>
      </ul>
    )
  }
}

export default Source
