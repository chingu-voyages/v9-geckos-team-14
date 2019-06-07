import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import MainPalette from "./components/Palette/MainPalette";
import ListColors from "./resources/ListColors";
import { generatePalette } from "./resources/Helper";
import DisplayListPalette from "./components/DisplayListPalette/DisplayListPalette";

class App extends React.Component {
  findPalette(id) {
    return ListColors.find(function(palette) {
      return palette.id === id;
    });
  }
  render() {
    // console.log("test" + JSON.stringify(generatePalette(ListColors[0])));

    return (
      <Switch>
        {" "}
        <Route
          exact
          path="/"
          render={routeProps => (
            <DisplayListPalette listPalettes={ListColors} {...routeProps} />
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

      // <div className="App">
      //   <MainPalette {...ListColors[0]} />
      // </div>
    );
  }
}

export default App;
