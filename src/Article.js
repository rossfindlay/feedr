import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Article extends Component {
  render() {
    return (
      <div>
        <article className="article">
          <section className="featuredImage">
            <img src={this.props.image} alt="" />
          </section>
          <section className="articleContent">
              <a href={this.props.url}><h3>{this.props.title}</h3></a>
              <h6>{this.props.category}</h6>
              <span className="articleDate">{this.props.date}</span>
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
