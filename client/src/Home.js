import React, { Children } from "react";
import ReactSearchBox from "react-search-box";
import "./styles/App.sass";

function App() {
  let data = [
    {
      key: "plano",
      value: "Plano"
    },
    {
      key: "richardson",
      value: "Richardson"
    },
    {
      key: "mckinney",
      value: "McKinney"
    },
    {
      key: "frisco",
      value: "Frisco"
    },
    {
      key: "victory",
      value: "Victory Park"
    }
  ];
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-Title">DIETDINE</h1>
        <ReactSearchBox
          placeholder="Enter a place"
          data={data}
          onSelect={record => {
            fetch("/geocode/" + record).then(res => {
              window.location.href = "./map?location=" + res;
            });
          }}
          onFocus={() => {
            console.log("This function is called when is focussed");
          }}
          onChange={value => console.log(value)}
          fuseConfigs={{
            threshold: 0.05
          }}
          inputFontColor="#f00"
        />
      </header>
    </div>
  );
}

export default App;
