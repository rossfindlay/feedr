import React, { Component } from 'react';
import './css/App.css';
import './css/html5bp.css'
import './css/normalize.css'
import Header from './Header'
import Article from './Article'
import Loader from './Loader'
import Popup from './Popup'
import uuid from 'uuid'
import placeholderImage from './images/article_placeholder_1.jpg'
import moment from 'moment'

class App extends Component {
  constructor(props) {
    super(props)

    this.getDiggFeed = this.getDiggFeed.bind(this)
    this.getMashableFeed = this.getMashableFeed.bind(this)
    this.getNewYorkTimesFeed = this.getNewYorkTimesFeed.bind(this)

    this.handleArticleClick = this.handleArticleClick.bind(this)
    this.handleSelectFeedApp = this.handleSelectFeedApp.bind(this)
    this.displayFeed = this.displayFeed.bind(this)
    this.handlePopupClose = this.handlePopupClose.bind(this)
    this.handleShowSearchApp = this.handleShowSearchApp.bind(this)
    this.handleEnterKeyApp = this.handleEnterKeyApp.bind(this)
    this.handleSearchText = this.handleSearchText.bind(this)
  }

  state = {
    showLoader: false,
    showPopup: false,
    showSearch: false,
    showOpenMsg: false,
    showErrorMsg: false,
    availableFeeds: [{name: 'digg'}, {name: 'New York Times'}, {name: 'Mashable'}],
    selectedFeed: {},
    selectedFeedData: [],
    popupData: {},
    searchText: ''
  }

  componentDidMount(){
    this.setState({
      showLoader: false,
      showOpenMsg: true,
    })
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

  handleEnterKeyApp() {
    this.setState({
      showSearch: false
    })
  }

  displayFeed() {
    if (this.state.selectedFeed.name === 'digg') {
      this.getDiggFeed()
    } else if (this.state.selectedFeed.name === 'New York Times') {
      this.getNewYorkTimesFeed()
    } else if (this.state.selectedFeed.name === 'Mashable') {
      this.getMashableFeed()
    }
  }

  handleArticleClick(id, title, description, url, date) {
    const article = this.state.selectedFeedData.find(article => article.id === id)
    this.setState({
      popupData: {
        title: article.title,
        content: article.description,
        url: article.url,
        date: article.date,
        image: article.image[0]
      },
      showPopup: true
    })
  }

  handlePopupClose() {
    this.setState({
      showPopup: false
    })
  }

  handleShowSearchApp() {
    if (this.state.showSearch) {
      this.setState({
        showSearch: false
      })
    } else {
      this.setState({
        showSearch: true
      })
    }
  }

  handleSearchText(text) {
    this.setState({
      searchText: text
    })
  }

  getDiggFeed() {
    fetch("https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json")
      .then(results => results.json())
      .then(results => {
        const articles = results.data.feed.map(article => {
          return (
            {
              date: moment.unix(article.date_published),
              score: article.digg_score,
              title: article.content.title,
              description: article.content.description,
              url: article.content.url,
              image: article.content.media.images.length > 0 ? article.content.media.images.map(image => image.url) : [placeholderImage],
              id: uuid.v4(),
              tags: article.content.tags.map(tag => tag.display_name)
            }
          )
        })
        this.setState({
          showOpenMsg: false,
          showErrorMsg: false,
          selectedFeedData: articles,
          showLoader: false,
        })
      })
      .catch((error) => {
        this.setState({
          showOpenMsg: false,
          showErrorMsg: true,
          showLoader: false,
          selectedFeedData: [],
        })
        console.log(error)
      })
  }

  getMashableFeed() {
    fetch("https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/api/v1/posts")
      .then(results => results.json())
      .then(results => {
        const articles = results.posts.map(article => {
          return (
            {
              date: moment(article.post_date, moment.ISO_8601),
              score: article.shares.total,
              title: article.title,
              description: article.content.excerpt,
              url: article.link,
              image: Object.entries(article.images).map(image => image[1]),
              id: uuid.v4(),
              tags: article.topics.map(topic => topic)
            }
          )
        })
        this.setState({
          showOpenMsg: false,
          showErrorMsg: false,
          selectedFeedData: articles,
          showLoader: false
        })
      })
      .catch((error) => {
        this.setState({
          showOpenMsg: false,
          showErrorMsg: true,
          showLoader: false,
          selectedFeedData: [],
        })
        console.log(error)
      })
  }

  getNewYorkTimesFeed() {
    fetch("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=594e88d819c444659def2f5ae4ce4dc2")
      .then(results => results.json())
      .then(results => {
        if (!results.status === "OK") {
          console.log('error')
        } else {
          const articles = results.results.map(article => {
            return (
              {
                date: moment(article.published_date, moment.ISO_8601),
                score: 0,
                title: article.title,
                description: article.abstract,
                url: article.short_url,
                image: article.multimedia.length > 0 ? article.multimedia.map(image => image.url) : [placeholderImage],
                id: uuid.v4(),
                tags: article.des_facet
              }
            )
          })
        this.setState({
          showOpenMsg: false,
          showErrorMsg: false,
          selectedFeedData: articles,
          showLoader: false,
        })
      }
      })
      .catch((error) => {
        this.setState({
          showOpenMsg: false,
          showErrorMsg: true,
          showLoader: false,
          selectedFeedData: [],
        })
        console.log(error)
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
            showSearch={this.state.showSearch}
            onShowSearchApp={this.handleShowSearchApp}
            onEnterKeyApp={this.handleEnterKeyApp}
            onTextChangeApp={this.handleSearchText}
          />
          <Loader showLoader={this.state.showLoader}/>
          <Popup
            showPopup={this.state.showPopup}
            popupData={this.state.popupData}
            onClosePopup={this.handlePopupClose}
          />
          <section id="main" className="container">
            {this.state.showOpenMsg ? <div className="message">Select a feed to display</div> : <div></div>}
            {this.state.showErrorMsg ? <div className="message">Feed failed to load</div> : <div></div>}
            {this.state.selectedFeedData.sort((a, b) => b.date - a.date)
              .filter(article => article.title.toLowerCase().includes(this.state.searchText.toLowerCase()))
              .map(article => {
                return (
                  <Article
                    key={article.id}
                    title={article.title}
                    image={article.image[1]}
                    score={article.score}
                    category={article.tags.map(tag => `#${tag} `)}
                    date={moment(article.date).fromNow()}
                    url={article.url}
                    id={article.id}
                    onClickArticle={this.handleArticleClick}
                  />
                )
              })
            }
          </section>
        </div>
      </div>
    );
  }
}

export default App;
