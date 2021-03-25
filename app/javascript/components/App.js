import React from "react"
import ObjectiveList from "./ObjectiveList"

import {Provider} from 'react-redux'

import configureStore from '../configureStore'

const store =  configureStore();

function App () {
    return (
      <Provider store={store}>
        <ObjectiveList/>
      </Provider>
    );
}

export default App
