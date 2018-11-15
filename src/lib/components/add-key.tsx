import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { AppState, View } from '../state'

export const AddKey: React.SFC<AppState> = state => (
  <div>
    <h1>SSH Sign</h1>
    <h2>Key Name</h2>
    <input value={state.addingKey.name} type="text" onChange={state.events.onChangeKeyName} />

    <h2>Key Content (PEM format)</h2>
    <div><textarea onChange={state.events.onChangeKeyContent} cols={30} rows={10}>{state.addingKey.privateKey}</textarea></div>
    <button onClick={state.events.onAddKey}>Add</button>
    <button onClick={state.events.onCancelAddingKey}>Cancel</button>
  </div>
)
