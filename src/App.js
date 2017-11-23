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
import placeholderImage from './images/article_placeholder_1.jpg'
import moment from 'moment'

class App extends Component {
  constructor(props) {
    super(props)

    this.getDiggFeed = this.getDiggFeed.bind(this)
    this.getGuardianFeed = this.getGuardianFeed.bind(this)
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
    showErrorMsg: false,
    showOpenMsg: false,
    availableFeeds: [{name: 'digg'}, {name: 'guardian tech'}, {name: 'New York Times'}, {name: 'Mashable'}],
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
    } else if (this.state.selectedFeed.name === 'guardian tech'){
      this.getGuardianFeed()
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
        console.log(results.data.feed)
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
          showErrorMsg: false,
          showOpenMsg: false,
          selectedFeedData: articles,
          showLoader: false,
        })
      })
      .catch(
        this.setState({
          showOpenMsg: false,
          showLoader: false,
          showErrorMsg: true,
        })
      )
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
              date: moment(article.webPublicationDate, moment.ISO_8601),
              score: 0,
              title: article.webTitle,
              description: '',
              url: article.webUrl,
              image: [gLogo],
              id: uuid.v4(),
              tags: [article.sectionName]
            }
          )
        })
        this.setState({
          showErrorMsg: false,
          showOpenMsg: false,
          selectedFeedData: articles,
          showLoader: false
        })
      })
      .catch(
        this.setState({
          showOpenMsg: false,
          showLoader: false,
          showErrorMsg: true,
        })
      )
  }

  getMashableFeed() {
    fetch("https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/api/v1/posts")
      .then(results => results.json())
      .then(results => {

        console.log(results.posts)
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
          showErrorMsg: false,
          showOpenMsg: false,
          selectedFeedData: articles,
          showLoader: false
        })
      })
      .catch(
        this.setState({
          showOpenMsg: false,
          showLoader: false,
          showErrorMsg: true,
        })
      )
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
          showErrorMsg: false,
          selectedFeedData: articles,
          showLoader: false,
        })
      }
      })
      .catch(
        this.setState({
          showOpenMsg: false,
          showLoader: false,
          showErrorMsg: true,
        })
      )


  }

  render() {
    console.log(this.state.selectedFeedData)
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
            {this.state.showErrorMsg ? <div className="message">Error displaying feed</div> : <div></div>}
            {this.state.selectedFeedData//add sort functino here
              .filter(article => article.title.toLowerCase().includes(this.state.searchText.toLowerCase()))
              .map(article => {
                return (
                  <Article
                    key={article.id}
                    title={article.title}
                    image={article.image[0]}
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
