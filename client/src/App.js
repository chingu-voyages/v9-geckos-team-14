import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import MainPalette from "./components/Palette/MainPalette";
import ListColors from "./resources/ListColors";
import { generatePalette } from "./resources/Helper";
import DisplayListPalette from "./components/DisplayListPalette/DisplayListPalette";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import CreatePalette from "./components/CreatePalette/CreatePalette";

class App extends React.Component {
  findPalette(id) {
    return ListColors.find(function(palette) {
      return palette.id === id;
    });
  }
  render() {
    return (
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition classNames="fade" timeout={500} key={location.key}>
              <Switch>
                <Route
                  exact
                  path="/palette/new"
                  render={() => <CreatePalette />}
                />
                <Route
                  exact
                  path="/"
                  render={routeProps => (
                    <div className="page">
                      <DisplayListPalette
                        listPalettes={ListColors}
                        {...routeProps}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={routeProps => (
                    <MainPalette
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.id)
                      )}
                    />
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}

export default App;
