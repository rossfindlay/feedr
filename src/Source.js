import React, { Component } from 'react'

const Source = (props) => {
  return (
    <ul>
      <li><a>News Source: <span>{props.selectedFeed.name}</span></a>
        <ul>
            {props.availableFeeds.map(feed => (
              <li
                onClick={() => props.onSelectFeed(feed.name)}
                key={feed.name}
              >
                <a>{feed.name}</a>
              </li>
            ))}
        </ul>
      </li>
    </ul>
  )
}

export default Source
