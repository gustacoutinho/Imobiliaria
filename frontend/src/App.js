import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createTheme, ThemeProvider} from "@material-ui/core"

import './App.css';
import Login from "./components/login";
import Home from "./components/home";
import Rent from "./components/rent";
import Sale from "./components/sale";
import Property from "./components/property";



const theme = createTheme ({
  palette: {
    primary:{
      main: '#0d47a1'
    } 
  },
});
class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div>
          <Switch>
            <Route exact={true} path='/' component={Login} />
            <Route path='/home' component={Home} />
            <Route path='/rent' component={Rent} />
            <Route path='/sale' component={Sale} />
            <Route path='/property/:id' component={Property} />
          </Switch>
        </div>
        </ThemeProvider>
      </BrowserRouter>
    )
  }
}

export default App;