import React from 'react';
import './App.css';

import {Provider} from 'react-redux';
import store from './components/store';
import Calendar from './components/Calendar';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Calendar />
     </Provider>
    </div>
  );
}

export default App;
