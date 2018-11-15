import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { AppState, View } from '../state'
import { Keys } from './keys'

export const Home: React.SFC<AppState> = state => {
  if (!state.loaded) {
    state.events.onRequestLoadStoredKeys()
    return null
  }
  return (
    <div>
    <h1>SSH Sign</h1>
    <Keys {...state} />
    <button onClick={state.events.onClickAddKey}>Add key</button>
    </div>
  )
}
