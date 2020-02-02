import React, { Component } from 'react';
import Home from './Home';
import { BrowserRouter, Route } from 'react-router-dom';
import Map from './components/Map';
import Add from './components/Add';

class App extends Component {
	render () {
		return (
			<div>
				<BrowserRouter>
					<div>
						<Route
							exact={true}
							path="/"
							render={() => (
								<div className="App">
									<Home />
								</div>
							)}
						/>
						<Route
							exact={true}
							path="/map"
							render={() => (
								<div className="App">
									<Map />
								</div>
							)}
						/>
						<Route
							exact={true}
							path="/add"
							render={() => (
								<div className="App">
									<Add />
								</div>
							)}
						/>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}
export default App;
