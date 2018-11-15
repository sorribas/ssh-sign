import {Key} from './state'

export function getKey (name: string, cb: (e: Error, key: Key) => void) {
  chrome.storage.local.get('keys', onget)

  function onget(keys: StoredObject) {
    if (!keys || !keys.keys) keys = {keys: []}
    cb(null, keys.keys.filter(x => x.name === name)[0])
  }
}

export function saveKey (key: Key, cb: (e: Error) => void) {
  chrome.storage.local.get('keys', onget)

  function onget(keys: StoredObject) {
    if (!keys || !keys.keys) keys = {keys: []}

    var saved = keys.keys.filter(x => x.name === key.name)[0]

    // replace in stored object if it exists there
    if (saved) keys.keys[keys.keys.indexOf(saved)] = key
    else keys.keys.push(key)
    chrome.storage.local.set(keys, () => cb(null))
  }
}

export function removeKey (keyName: string, cb: (e: Error) => void) {
  chrome.storage.local.get('keys', onget)

  function onget(keys: StoredObject) {
    if (!keys || !keys.keys) return
    var index = keys.keys.indexOf(keys.keys.filter(k => k.name === keyName)[0])
    keys.keys.splice(index, 1)
    chrome.storage.local.set(keys, () => cb(null))
  }
}

export function getAllKeys (cb: (e: Error, keys: Key[]) => void) {
  chrome.storage.local.get('keys', onget)

  function onget(keys: StoredObject) {
    if (!keys || !keys.keys) keys = {keys: []}
    cb(null, keys.keys)
  }
}

interface StoredObject {
  keys: Key[]
}
