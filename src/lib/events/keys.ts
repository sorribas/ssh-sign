import { AppState, View, Key } from '../state'
import * as storage from '../storage'

export function onClickAddKey (state: AppState, render: () => void) {
  return function () {
    state.view = View.AddKey
    render()
  }
}

export function onAddKey (state: AppState, render: () => void) {
  return function () {
    var newKey = state.addingKey
    state.view = View.Home
    state.keys.push(state.addingKey)
    state.addingKey = {name: '', privateKey: ''}

    storage.saveKey(newKey, () => {})
    render()
  }
}

export function onChangeKeyName (state: AppState, render: () => void) {
  return function (evt: React.ChangeEvent<HTMLInputElement>) {
    state.addingKey.name = evt.target.value
    render()
  }
}

export function onChangeKeyContent (state: AppState, render: () => void) {
  return function (evt: React.ChangeEvent<HTMLTextAreaElement>) {
    state.addingKey.privateKey = evt.target.value
    render()
  }
}

export function onRequestLoadStoredKeys (state: AppState, render: () => void) {
  return function () {
    storage.getAllKeys(onget)

    function onget (err: Error, keys: Key[]) {
      if (err) return
      state.keys = keys
      state.loaded = true
      if (keys[0]) state.keyForSigning = keys[0].name
      render()
    }
  }
}

export function onCancelAddingKey (state: AppState, render: () => void) {
  return function () {
    state.addingKey = { name: '', privateKey: '' }
    state.view = View.Home
    render()
  }
}

export function onDeleteKey (state: AppState, render: () => void) {
  return function (name: string) {
    storage.removeKey(name, onremove)

    function onremove () {
      state.events.onRequestLoadStoredKeys()
    }
  }
}
