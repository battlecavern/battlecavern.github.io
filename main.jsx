import React from 'react'
import ReactDOM from 'react-dom'
import swal from 'sweetalert2'
import $ from 'jquery'
import './main.css'

function getQuery () {
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
        <button onClick={this.themeChange} id="themeChanger">Change Theme</button>
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

if (getQuery().themeChange) {
  swal({
    type: 'success',
    text: `Successfully changed to ${themeObject[getQuery().themeChange]} theme`
  })
}
