import React, { Component } from 'react'
import searchImg from './images/search.png'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <header>
          <section className="container">
            <a href="#"><h1>Feedr</h1></a>
            <nav>
              <ul>
                <li><a href="#">News Source: <span>Source Name</span></a>
                  <ul>
                      <li><a href="#">Source 1</a></li>
                      <li><a href="#">Source 2</a></li>
                      <li><a href="#">Source 3</a></li>
                  </ul>
                </li>
              </ul>
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
