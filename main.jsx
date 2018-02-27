import React from 'react'
import ReactDOM from 'react-dom'
import { Home, Menu, Code, ColorLens } from 'material-ui-icons'
import swal from 'sweetalert2'
import $ from 'jquery'
import './main.scss'

// Import Font(s)
ReactDOM.render(
  <link
    href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,700,700i"
    rel="stylesheet"
  />,
  $('#fonts').get(0)
)

function getQuery () {
  /**
   * Gets query from URL
   * @returns {Object} - Query as Object
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

const { Fragment: F } = React
const themeObject = {
  dark: 'Zekrom',
  light: 'Reshiram'
}
const themes = ['light', 'dark']
const theme =
  (themes.includes(getQuery().theme) && getQuery().theme) ||
  (themes.includes(window.localStorage.theme) && window.localStorage.theme) ||
  'light'
const navElements = [
  { name: 'Home', href: '/', id: 'home' },
  {
    name: 'Discord',
    href: '//discord.gg/9qvScC8',
    id: 'discord'
  },
  {
    name: 'GitHub',
    href: '//github.com/battlecavern/battlecavern.github.io',
    id: 'gh'
  }
]
var sideBarOpen = false

class NavBar extends React.Component {
  async themeChange () {
    let { value: themeChange } = await swal({
      title: 'Change theme',
      input: 'select',
      inputOptions: themeObject,
      showCancelButton: true
    })
    if (themeChange) {
      swal({
        title: 'Changing theme...',
        onOpen: () => {
          swal.showLoading()
        },
        allowOutsideClick: false,
        allowEscapeKey: false
      })
      window.localStorage.theme = themeChange
      window.location.replace(`?themeChange=${themeChange}`)
    }
  }
  render () {
    let elements = navElements.map(item => {
      return (
        <a
          key={item.id}
          id={`nav-${item.id}`}
          className="nav-item"
          href={item.href}
        >
          {item.name}
        </a>
      )
    })
    return (
      <F>
        <button onClick={this.themeChange} id="themeChanger">
          Change Theme
        </button>
        {elements}
        <span id="nav-end" />
      </F>
    )
  }
}

class MobileNavBar extends React.Component {
  openSideBar () {
    if (!sideBarOpen) {
      $('#sidebar-container, #sidebar').show()
      sideBarOpen = true
      hideOnClickOutside('#sidebar', () => {
        $('#sidebar-container').hide()
        sideBarOpen = false
      })
    }
  }
  render () {
    return (
      <F>
        <a
          href="javascript:void(0)"
          onClick={this.openSideBar}
          id="menu-icon"
          className="mobile-icon"
        >
          <Menu />
        </a>
        <a href="/" id="home-icon" className="mobile-icon">
          <Home />
        </a>
        <a
          href="javascript:void(0)"
          onClick={NavBar.prototype.themeChange}
          id="theme-icon"
          className="mobile-icon"
        >
          <ColorLens />
        </a>
        <a
          href="//github.com/battlecavern/battlecavern.github.io"
          id="gh-icon"
          className="mobile-icon"
        >
          <Code />
        </a>
      </F>
    )
  }
}

class SideBar extends React.Component {
  render () {
    let elements = navElements.map(item => {
      return (
        <div key={item.id} className="sidebar-item-container">
          <a
            id={`sidebar-${item.id}`}
            className="sidebar-item"
            href={item.href}
          >
            {item.name}
          </a>
        </div>
      )
    })
    return (
      <F>
        <button onClick={NavBar.prototype.themeChange} id="themeChanger">
          Change Theme
        </button>
        {elements}
      </F>
    )
  }
}

ReactDOM.render(<NavBar />, $('#nav').get(0))
ReactDOM.render(<MobileNavBar />, $('#nav-mobile').get(0))
ReactDOM.render(<SideBar />, $('#sidebar').get(0))

$('*').addClass(`${theme}-theme`)

/* Any theme-specific code starts here */

if (theme === 'light') {
  $('#banner').css({
    backgroundImage: 'url(/img/banners/light.png)',
    backgroundSize: '100vw',
    height: 263 * ($(window).width() / 1545),
    backgroundRepeat: 'no-repeat'
  })
  $(window).resize(() => {
    $('#banner').css({ height: 263 * ($(window).width() / 1545) })
  })
}
if (theme === 'dark') {
  $('#banner').css({
    backgroundImage: 'url(/img/banners/dark.png)',
    backgroundSize: '100vw',
    height: 250 * ($(window).width() / 1212),
    backgroundRepeat: 'no-repeat'
  })
  $(window).resize(() => {
    $('#banner').css({
      height: 250 * ($(window).width() / 1212),
      backgroundSize: '100vw'
    })
  })
}

if (getQuery().themeChange) {
  swal({
    type: 'success',
    text: `Successfully changed to ${themeObject[getQuery().themeChange]} theme`
  })
}

/* Sticky NavBar */
window.scroll(() => {
  if (window.pageYOffset >= $('#nav').offset().top) {
    $('#nav')
      .addClass('sticky')
      .css({ position: 'fixed' })
  } else {
    $('#nav')
      .removeClass('sticky')
      .css({ position: 'absolute' })
  }
})

/* Sidebar for mobile devices */
function elementFitsOnScreenX (element) {
  /**
   * Tests if the element fits on the screen width
   * @param {(string|Object)} element - Selector or element to check
   * @returns {boolean} - True if the element fits on the screen X axis
   */
  return $(element).width() + $(element).offset().left < $(window).width()
}

if (
  (!elementFitsOnScreenX('#nav-end') || getQuery().mobile === 'true') &&
  getQuery().mobile !== 'false'
) {
  $('#nav').hide()
  $('#nav-mobile').show()
  $('*').addClass('mobile')
}
$(window).resize(() => {
  if (
    (!elementFitsOnScreenX('#nav-end') || getQuery().mobile === 'true') &&
    getQuery().mobile !== 'false'
  ) {
    $('#nav').hide()
    $('#nav-mobile').show()
    $('*').addClass('mobile')
  } else {
    $('#nav').show()
    $('#nav-mobile, #sidebar, #sidebar-container').hide()
    $('*').removeClass('mobile')
  }
})

function hideOnClickOutside (selector, callback) {
  const outsideClickListener = event => {
    if (!$(event.target).closest(selector).length) {
      if ($(selector).is(':visible')) {
        $(selector).hide()
        removeClickListener()

        if (callback) callback()
      }
    }
  }

  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener)
  }

  document.addEventListener('click', outsideClickListener)
}
