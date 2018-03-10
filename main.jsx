import React from 'react'
import ReactDOM from 'react-dom'
import { Link, Home, Menu, Code, ColorLens } from 'material-ui-icons'
import swal from 'sweetalert2'
import $ from 'jquery'
import './main.scss'

const query = new window.URLSearchParams(window.location.search)
const { Fragment: F } = React
const themeObject = {
  dark: 'Zekrom',
  light: 'Reshiram'
}
const themes = ['light', 'dark']
const theme =
  (themes.includes(query.get('theme')) && query.get('theme')) ||
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

// For scrolling
function jumpTo (element) {
  $('html, body').animate(
    {
      scrollTop: `${$(element).offset().top}px`
    },
    'slow'
  )
}

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

if (query.get('themeChange')) {
  swal({
    type: 'success',
    text: `Successfully changed to ${
      themeObject[query.get('themeChange')]
    } theme`
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

/**
 * Tests if the element fits on the screen width
 * @param {(string|Object)} element - Selector or element to check
 * @returns {boolean} - True if the element fits on the screen X axis
 */
function elementFitsOnScreenX (element) {
  return $(element).width() + $(element).offset().left < $(window).width()
}

if (
  (!elementFitsOnScreenX('#nav-end') || query.get('mobile') === 'true') &&
  query.get('mobile') !== 'false'
) {
  $('#nav').hide()
  $('#nav-mobile').show()
  $('*').addClass('mobile')
}
$(window).resize(() => {
  if (
    (!elementFitsOnScreenX('#nav-end') || query.get('mobile') === 'true') &&
    query.get('mobile') !== 'false'
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

/* Add IDs for permalinks */
var headings = $('h1, h2, h3, h4, h5, h6')
var names = []
for (var heading, i = 0; i < headings.length; i++) {
  heading = headings[i]
  let id = $(heading)
    .text()
    .replace(/\W/g, '-')
    .replace(/_/g, '-')
    .toLowerCase()
  while (names.includes(id)) {
    id += '-'
  }
  names.push(id)
  $(heading)
    .attr('id', id)
    .prepend(
      $('<span>')
        .attr('id', `${id}-permalink`)
        .css({ margin: 0, opacity: 0, cursor: 'pointer' })
        .click(() => window.location.replace(`#${id}`))
    )
    .hover(
      () => $(`#${id}-permalink`).css({ opacity: 1 }),
      () => $(`#${id}-permalink`).css({ opacity: 0 })
    )
  ReactDOM.render(<Link />, $(`#${id}-permalink`).get(0))
}

$(document).ready(() => {
  if ($(window.location.hash)) {
    jumpTo(window.location.hash)
  }
})
