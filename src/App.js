
import React from 'react';
import { BrowserRouter as Router, Route, Switch　} from "react-router-dom";
import Home from './components/Pages/home';
import Word from './components/Pages/word';
import Phrase from './components/Pages/phrase';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/word' component={Word}></Route>
          <Route path='/phrase' component={Phrase}></Route>
        </Switch>
      </Router>
  );
}

export default App;

