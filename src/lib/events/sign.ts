import { AppState, View, Key } from '../state'
import * as storage from '../storage'
import * as rsa from '../rsa'

export function onConfirmSign (state: AppState, render: () => void) {
  return function () {
    var key = state.keys.filter(k => k.name === state.keyForSigning)[0]
    if (!key) return
    var signature = rsa.sign(key.privateKey, state.passphraseForKey, state.messageToSign)
    chrome.runtime.sendMessage({replyTo: state.signatureRequestId, signature: signature})
    setTimeout(() => window.close(), 500)
  }
}

export function onCancelSign (state: AppState, render: () => void) {
  return function () {
    window.close()
  }
}

export function onChangeSigningKey (state: AppState, render: () => void) {
  return function (keyName: string) {
    state.keyForSigning = keyName
    render()
  }
}

export function onChangeSigningPassphrase (state: AppState, render: () => void) {
  return function (passphrase: string) {
    state.passphraseForKey = passphrase
    render()
  }
}
