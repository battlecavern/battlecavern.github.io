import React from 'react'
import ReactDOM from 'react-dom'
import swal from 'sweetalert2'
import $ from 'jquery'
import './main.css'

function getQuery () {
  /**
   * Gets query from URL
   * @returns {object} Query as Object
   */
  let queryText = window.location.href.slice(
    window.location.href.indexOf('?') + 1
  )
  let querySplit = queryText.split('&')
  let queryResolved = {}
  for (let i = 0, query; i < querySplit.length; i++) {
    query = querySplit[i]
    let queryKeyValue = query.toString().split('=') || []
    queryResolved[queryKeyValue[0]] = queryKeyValue[1]
  }
  return queryResolved
}

const { Fragment } = React
const themeObject = {
  dark: 'Zekrom',
  light: 'Reshiram'
}
const themes = ['light', 'dark']
const theme =
  (themes.includes(getQuery().theme) && getQuery().theme) ||
  (themes.includes(window.localStorage.theme) && window.localStorage.theme) ||
  'light'

class NavBar extends React.Component {
  async themeChange () {
    let { value: themeChange } = await swal({
      title: 'Change theme',
      input: 'select',
      inputOptions: themeObject
    })
    if (themeChange) {
      swal({
        title: 'Changing theme...',
        onOpen: () => {
          swal.showLoading()
        }
      })
      window.localStorage.theme = themeChange
      window.location.replace(`?themeChange=${themeChange}`)
    }
  }
  render () {
    return (
      <Fragment>
        <button onClick={this.themeChange} id="themeChanger">
          Change Theme
        </button>
        <a href="/" className="nav-item" id="nav-home">
          Home
        </a>
      </Fragment>
    )
  }
}

ReactDOM.render(<NavBar />, $('#nav').get(0))

$('*').addClass(`${theme}-theme`)

/* Any theme-specific code starts here */

if (theme === 'light') {
  $('#banner').css({
    'background-image': 'url(/img/banners/light.png)',
    'background-size': '100vw',
    height: 263 * ($(window).width() / 1545),
    'background-repeat': 'no-repeat'
  })
  $(window).resize(() => {
    $('#banner').css({ height: 263 * ($(window).width() / 1545) })
  })
}
if (theme === 'dark') {
  $('#banner').css({
    'background-image': 'url(/img/banners/dark.png)',
    'background-size': '100vw',
    height: 250 * ($(window).width() / 1212),
    'background-repeat': 'no-repeat'
  })
  $(window).resize(() => {
    $('#banner').css({ height: 250 * ($(window).width() / 1212), 'background-size': '100vw' })
  })
}

if (getQuery().themeChange) {
  swal({
    type: 'success',
    text: `Successfully changed to ${themeObject[getQuery().themeChange]} theme`
  })
}

/* Sticky NavBar */
var navBar = $('#nav').get(0)
var navOffset = navBar.offsetTop
window.onscroll = stickTest

function stickTest () {
  if (window.pageYOffset >= navOffset) {
    $(navBar)
      .addClass('sticky')
      .css({ position: 'fixed' })
  } else {
    $(navBar)
      .removeClass('sticky')
      .css({ position: 'absolute' })
  }
}
