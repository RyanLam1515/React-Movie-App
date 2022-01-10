import './App.css';
import React from "react";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Header from './Components/Header';
import SimpleBottomNavigation from './Components/MainNav';
import Trending from './Pages/Trending';
import Movies from './Pages/Movies';
import Series from './Pages/Series';
import Search from './Pages/Search';
import WatchList from './Pages/WatchList';
import Watched from './Pages/Watched';

import { GlobalProvider} from './Context/GlobalState';

function App() {

    return (
      <GlobalProvider>
      <Header />
      <BrowserRouter>
          <Switch>
            <Route path='/' component={Trending} exact/>
            <Route path='/movies' component={Movies}/>
            <Route path='/series' component={Series}/>
            <Route path='/search' component={Search}/>
            <Route path='/watchlist' component={WatchList}/>
            <Route path='/watched' component={Watched}/>
          </Switch>
        <SimpleBottomNavigation />
      </BrowserRouter>
      </GlobalProvider>
    );
  }

export default App;
