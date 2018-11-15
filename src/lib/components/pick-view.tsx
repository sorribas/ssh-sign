import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {AppState, View} from '../state'
import { Home } from './home';
import { AddKey } from './add-key';
import { Sign } from './sign';

export const PickView: React.SFC<AppState> = state => {
  switch (state.view) {
    case View.Home:
      return <Home {...state} />
    case View.AddKey:
      return <AddKey {...state} />
    case View.Sign:
      return <Sign {...state} />
  }
}

