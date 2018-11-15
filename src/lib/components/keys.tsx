import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {AppState, Key} from '../state'

export const Keys: React.SFC<AppState> = state => {
  const renderKey: React.SFC<Key> = rk 
  return (
    <div>
      {state.keys.map(renderKey)}
    </div>
  )

  function rk (key: Key, i:number) {
    return (
      <div className='key-row' key={i}>
        <div>{key.name}</div>
        <div onClick={() => state.events.onDeleteKey(key.name)}>X</div>
      </div>
    )
  }
}
