import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { AppState } from '../state'

export const Sign: React.SFC<AppState> = state => {
  if (!state.loaded) {
    state.events.onRequestLoadStoredKeys()
    return null
  }
  var key = state.keys.filter(k => k.name === state.keyForSigning)[0]
  var isEncrypted = key && key.privateKey.indexOf('ENCRYPTED') !== -1
  return (
    <div>
      <h1>Sign Message</h1>
      <div>Signing message: <strong>{state.messageToSign}</strong></div>
      <div>
        <select value={state.keyForSigning} onChange={change}>
          {state.keys.map(k => (<option key={k.name} value={k.name}>{k.name}</option>))}
        </select>
      </div>
      {isEncrypted ? <div><input value={state.passphraseForKey} onChange={changePassphrase} type='password' /></div> : null}
      <div>
        <button disabled={isEncrypted && state.passphraseForKey === ''} onClick={sign}>Sign</button>
        <button onClick={cancel}>Cancel</button>
      </div>
    </div>
  )

  function sign () {
    state.events.onConfirmSign()
  }

  function cancel () {
    state.events.onCancelSign()
  }

  function change (e: React.ChangeEvent<HTMLSelectElement>) {
    state.events.onChangeSigningKey(e.target.value)
  }

  function changePassphrase (e: React.ChangeEvent<HTMLInputElement>) {
    state.events.onChangeSigningPassphrase(e.target.value)
  }
}
