'use strict'

// The development file, in case you want to change some things
// with your dev setup.

import '../css/main.scss'

import 'babel-polyfill'
import {render} from 'react-dom'
import getManager from '../js/main'

// Render the page.
render(
  getManager(),
  document.getElementById('root')
)
