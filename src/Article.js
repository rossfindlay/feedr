import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Article extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onClickArticle(this.props.id)
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div>
        <article className="article" onClick={this.handleClick}>
          <section className="featuredImage">
            <img src={this.props.image} alt="" />
          </section>
          <section className="articleContent">
              <h3>{this.props.title}</h3>
              <h6>{this.props.category}</h6>
              <span className="articleDate">Published {this.props.date}</span>
          </section>
          <section className="impressions">
            {this.props.score}
          </section>
          <div className="clearfix"></div>
        </article>
      </div>
    )
  }
}

Article.PropTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string,
  score: PropTypes.number.isRequired
}

export default Article
