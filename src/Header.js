import React, { Component } from 'react'
import Source from './Source'
import Search from './Search'

const Header = (props) => {
  return (
    <div>
      <header>
        <section className="container">
          <a><h1>Feedr</h1></a>
          <nav className="navBar">
            <Source
              selectedFeed={props.selectedFeed}
              availableFeeds={props.availableFeeds}
              onSelectFeed={props.onSelectFeed}
            />
            {/* Great component abstraction */}
            <Search
              showSearch={props.showSearch}
              onShowSearch={props.onShowSearchApp}
              onEnterKey={props.onEnterKeyApp}
              onTextChange={props.onTextChangeApp}
            />
          </nav>
          <div className="clearfix"></div>
        </section>
      </header>
    </div>
  )
}

export default Header
