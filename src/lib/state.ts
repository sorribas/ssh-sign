import {addEvents} from './events'

export interface AppState {
  view: View,
  keys: Key[],
  addingKey: Key,
  loaded: boolean,
  messageToSign: string,
  keyForSigning: string,
  signatureRequestId: number,
  passphraseForKey: string,
  events: Events
}

export enum View {
  Home,
  AddKey,
  Sign
}

export function getInitialState (render: () => void): AppState {
  var state: AppState = {
    view: View.Home,
    keys: [{name: `ed's key`, privateKey: ''}],
    addingKey: {name: '', privateKey: ''},
    loaded: false,
    messageToSign: '',
    keyForSigning: '',
    signatureRequestId: 1,
    passphraseForKey: '',
    events: null
  }

  addEvents(state, render)

  // set up the signing view, dunno if this is the best place
  // for this
  var urlHash = window.location.href.split('#')[1]
  if (urlHash) {
    var parts = urlHash.split('/')
    if (parts[0] === 'sign') {
      state.view = View.Sign
      state.messageToSign = parts[1]
      state.signatureRequestId = Number(parts[2])
    }
  }

  return state
}

export interface Key {
  name: string,
  privateKey: string
}

export interface Events {
  onClickAddKey: () => void
  onChangeKeyName: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeKeyContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onAddKey: () => void
  onRequestLoadStoredKeys: () => void
  onCancelAddingKey: () => void
  onConfirmSign: () => void
  onCancelSign: () => void
  onChangeSigningKey: (keyName: string) => void
  onChangeSigningPassphrase: (passphrase: string) => void
  onDeleteKey: (name: string) => void
}
