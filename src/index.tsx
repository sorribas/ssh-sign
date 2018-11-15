import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {AppState, View, getInitialState} from './lib/state'
import {PickView} from './lib/components/pick-view'

import {addEvents} from './lib/events'

var App: React.SFC<AppState> = state => (
  <div>
    {PickView(state)}
  </div>
)

var state: AppState = getInitialState(render)
render()

function render () {
  ReactDOM.render(App(state), document.getElementById("app"))
}
