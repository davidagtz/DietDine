import React, { Component } from "react";
import ReactSearchBox from "react-search-box";
import "./styles/App.sass";
import Multiselect from "multiselect-dropdown-react";
import Button from "@material-ui/core/Button";
import { Data, Drop_down_data } from "./dropdown";

document.addEventListener("DOMContentLoaded", () => {
  const arr = document.getElementsByTagName("input");
  for (const inp of arr) {
    if (inp.placeholder == "Search Data")
      inp.placeholder = "Search your diet...";
  }

  const el = document.getElementsByClassName("multiSelect")[0];
  if (!el) return;
  let fe = el.children[0];
  el.children[0].remove();
  el.append(fe);
});

class App extends Component {
  state = {
    error: null
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div id="big-cont">
            <h1 className="App-Title">DIETDINE</h1>
            <div id="inputs">
              <ReactSearchBox
                placeholder="Enter a place"
                data={Data}
                onSelect={record => {
                  document.globals.location = record.key;
                }}
                onFocus={() => {
                  console.log("This function is called when is focused");
                }}
                onChange={value => console.log(value)}
                fuseConfigs={{
                  threshold: 0.05
                }}
                inputFontColor="#f00"
              />
              {this.state.error ? (
                <p className="error">{this.state.error}</p>
              ) : null}
              <Multiselect
                placeholder="Enter customizations"
                options={Drop_down_data}
                onSelectOptions={params => (document.globals.params = params)}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  const loc = document.globals.location;
                  if (!loc) {
                    this.setState({ error: "No location provided" });
                    return;
                  }
                  let params = "";
                  for (const val of document.globals.params)
                    params += "&" + val + "=true";
                  const url = "/map?location=" + loc + params;
                  window.location.href = url;
                }}
              >
                Search
              </Button>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
