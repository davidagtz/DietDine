import React, { Children } from "react";
import "./styles/App.sass";

function App() {
	let children = [];
	for(const city of ["Richardson", "Plano", "Frisco", "McKinney", "Victory Park"])
		children.push(<a href="/map">{city}</a>)
	return (
		<div className="App">
			<header className="App-header">
				<h1 className="App-Title">
					DIETDINE
				</h1>
				<input type="text" className="input-Searchbar" placeholder="Enter location..." />
				<ul className = "closest">
					{children}
				</ul>
			</header>
		</div>

	);
}

export default App;
