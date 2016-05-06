'use strict'

import '../css/main.scss'

import 'babel-polyfill'
import {render} from 'react-dom'
import getManager from '../js/main'

// Render the page.
render(
  getManager(),
  document.getElementById('root')
)
