import { AppState } from '../state'
import * as keys from './keys'
import * as sign from './sign'

export function addEvents (state: AppState, render: () => void) {
  state.events = {
    onClickAddKey: keys.onClickAddKey(state, render),
    onChangeKeyName: keys.onChangeKeyName(state, render),
    onChangeKeyContent: keys.onChangeKeyContent(state, render),
    onAddKey: keys.onAddKey(state, render),
    onRequestLoadStoredKeys: keys.onRequestLoadStoredKeys(state, render),
    onCancelAddingKey: keys.onCancelAddingKey(state, render),
    onConfirmSign: sign.onConfirmSign(state, render),
    onCancelSign: sign.onCancelSign(state, render),
    onChangeSigningKey: sign.onChangeSigningKey(state, render),
    onChangeSigningPassphrase: sign.onChangeSigningPassphrase(state, render),
    onDeleteKey: keys.onDeleteKey(state, render)
  }
}
