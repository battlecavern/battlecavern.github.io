import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import './main.css'

const { Fragment } = React

class NavBar extends React.Component {
  render () {
    return (
      <Fragment>
        <a href="/" className="nav-item" id="nav-home">
          Home
        </a>
      </Fragment>
    )
  }
}

ReactDOM.render(<NavBar />, $('#nav').get(0))
