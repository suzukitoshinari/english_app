import React from 'react';
import { BrowserRouter as Router, Route, Switch　} from "react-router-dom";
import Home from './components/Pages/Home';
import Word from './components/Pages/Word';
import Phrase from './components/Pages/Phrase';

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

