import React, { Component } from 'react';
import './css/App.css';
import './css/html5bp.css'
import './css/normalize.css'
import Header from './Header'
import Article from './Article'
import Loader from './Loader'
import Popup from './Popup'
import uuid from 'uuid'
import gLogo from './images/g-logo.png'

class App extends Component {
  constructor(props) {
    super(props)

    this.getDiggFeed = this.getDiggFeed.bind(this)
    this.getGuardianFeed = this.getGuardianFeed.bind(this)
    this.getRedditFeed = this.getRedditFeed.bind(this)
    this.getNewYorkTimesFeed = this.getNewYorkTimesFeed.bind(this)

    this.handleArticleClick = this.handleArticleClick.bind(this)
    this.handleSelectFeedApp = this.handleSelectFeedApp.bind(this)
    this.displayFeed = this.displayFeed.bind(this)
    this.handlePopupClose = this.handlePopupClose.bind(this)
  }

  state = {
    showLoader: false,
    showPopup: false,
    availableFeeds: [{name: 'digg'},{name: 'guardian tech'}, {name: 'New York Times'}],
    selectedFeed: {},
    selectedFeedData: [],
    popupTitle: '',
    popupContent: '',
    popupUrl: ''
  }

  componentDidMount(){
    this.setState({
      showLoader: false,
    })

    this.getNewYorkTimesFeed()

  }

  handleSelectFeedApp(name) {
    const chosenFeed = this.state.availableFeeds.find(feed => feed.name === name)
    this.setState({
      selectedFeed: chosenFeed,
      showLoader: true
    },() => {
      this.displayFeed()
    })
  }

  displayFeed() {
    if (this.state.selectedFeed.name === 'digg') {
      this.getDiggFeed()
    } else if (this.state.selectedFeed.name === 'guardian tech'){
      this.getGuardianFeed()
    } else if (this.state.selectedFeed.name === 'New York Times') {
      this.getNewYorkTimesFeed()
    }
  }

  handleArticleClick(id, title, description, url) {
    const article = this.state.selectedFeedData.find(article => article.id === id)
    this.setState({
      popupTitle: article.title,
      popupContent: article.description,
      popupUrl: article.url,
      showPopup: true
    })
    console.log(article)

  }

  handlePopupClose() {
    this.setState({
      showPopup: false
    })
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
          selectedFeedData: articles,
          showLoader: false,
        })
      })
  }

  getGuardianFeed() {
    fetch("https://content.guardianapis.com/search?q=technology&api-key=781f7809-b149-4290-ac68-48461944bec8")
      .then(results => results.json())
      .then(results => {
        if (!results.response.status === "ok") {
          return console.log('error')
        }
        console.log(results.response.results)
        const articles = results.response.results.map(article => {
          return (
            {
              date: article.webPublicationDate,
              score: 0,
              title: article.webTitle,
              description: '',
              url: article.webUrl,
              image: gLogo,
              id: uuid.v4(),
              tags: [article.sectionName]
            }
          )
        })
        this.setState({
          selectedFeedData: articles,
          showLoader: false
        })
      })
  }

  getRedditFeed() {
    fetch("https://www.reddit.com/api/v1/authorize?client_id=rossf9&response_type=code&state=RANDOM_STRING&redirect_uri=URI&duration=DURATION&scope=SCOPE_STRING")
      .then(results => results.json())
      .then(results => {
        console.log(results)
      })
  }

  getNewYorkTimesFeed() {


    fetch("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=594e88d819c444659def2f5ae4ce4dc2")
      .then(results => results.json())
      .then(results => {
        if (!results.status === "OK") {
          console.log('error')
        } else {
          console.log(results.results)
          const articles = results.results.map(article => {
            return (
              {
                date: article.published_date,
                score: 0,
                title: article.title,
                description: article.abstract,
                url: article.short_url,
                image: 'article.multimedia[1].url',
                id: uuid.v4(),
                tags: article.des_facet
              }
            )
          })
        this.setState({
          selectedFeedData: articles,
          showLoader: false,
        })
      }
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
          <Popup
            showPopup={this.state.showPopup}
            popupTitle={this.state.popupTitle}
            popupContent={this.state.popupContent}
            popupUrl={this.state.popupUrl}
            onClosePopup={this.handlePopupClose}
          />
          <section id="main" className="container">
            {!this.state.selectedFeed.name ? <div>Select a feed to display</div> : <div></div>}
            {this.state.selectedFeedData.map(article => {
              return (
                <Article
                  key={article.id}
                  title={article.title}
                  image={article.image}
                  score={article.score}
                  category={article.tags.map(tag => `#${tag} `)}
                  date={timeSince(article.date)}
                  url={article.url}
                  id={article.id}
                  onClickArticle={this.handleArticleClick}
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
