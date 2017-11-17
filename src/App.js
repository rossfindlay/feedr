import React, { Component } from 'react';
import './css/App.css';
import './css/html5bp.css'
import './css/normalize.css'
import Header from './Header'
import Article from './Article'
import Loader from './Loader'
import Popup from './Popup'
import uuid from 'uuid'

class App extends Component {
  constructor(props) {
    super(props)

    this.getDiggFeed = this.getDiggFeed.bind(this)
    this.getGuardianFeed = this.getGuardianFeed.bind(this)

    this.handleSelectFeedApp = this.handleSelectFeedApp.bind(this)
  }

  state = {
    showLoader: false,
    showPopup: false,
    availableFeeds: [{name: 'digg'},{name: 'feed 2'}, {name: 'feed 3'}],
    selectedFeed: '',
    diggFeed: [],
  }

  componentDidMount(){
    this.setState({
      showLoader: true
    })
    this.getGuardianFeed()
  }

  handleSelectFeedApp(name) {
    const chosenFeed = this.state.availableFeeds.find(feed => feed.name === name)
    this.setState({
      selectedFeed: chosenFeed,
      showLoader: true
    })
    this.getDiggFeed()
  }

  getDiggFeed() {
    fetch("https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json")
      .then(results => results.json())
      .then(results => {
        const articles = results.data.feed.map(article => {
          return (
            {
              date: article.date_published,
              score: article.digg_score,
              title: article.content.title,
              description: article.content.description,
              url: article.content.url,
              image: article.content.media.images[3].url,
              id: uuid.v4(),
              tags: article.content.tags.map(tag => tag.display_name)
            }
          )
        })
        this.setState({
          diggFeed: articles,
          showLoader: false
        })
      })
  }

  getGuardianFeed() {
    fetch("https://content.guardianapis.com/search?api-key=781f7809-b149-4290-ac68-48461944bec8")
      .then(results => results.json())
      .then(results => {
        console.log(results)

      })
  }

  render() {
    return (
      <div className="App">
        <div>
          <Header
            selectedFeed={this.state.selectedFeed}
            availableFeeds={this.state.availableFeeds}
            onSelectFeed={this.handleSelectFeedApp}
          />
          <Loader showLoader={this.state.showLoader}/>
          <Popup showPopup={this.state.showPopup}/>
          <section id="main" className="container">
            {this.state.diggFeed.map(article => {
              return (
                <Article
                  key={article.id}
                  title={article.title}
                  image={article.image}
                  score={article.score}
                  category={article.tags.map(tag => `#${tag} `)}
                  date={timeSince(article.date)}
                  url={article.url}
                />
              )
            })}

          </section>
        </div>
      </div>
    );
  }
}

function timeSince(date) {
  date = date * 1000
  const seconds = Math.floor((new Date() - date) / 1000)
  let interval = Math.floor(seconds / 31536000)

  if (interval > 1) {
    return `posted ${interval} years ago`
  }
  interval = Math.floor(seconds / 2592000)
  if (interval > 1) {
    return `posted ${interval} months ago`
  }
  interval = Math.floor(seconds / 86400)
  if (interval > 1) {
    return `posted ${interval} days ago`
  }
  interval = Math.floor(seconds / 3600)
  if (interval > 1) {
    return `posted ${interval} hours ago`
  }
  interval = Math.floor(seconds / 60)
  if (interval > 1) {
    return `posted ${interval} minutes ago`
  }
  return `posted ${Math.floor(seconds)} seconds ago`
}

export default App;
