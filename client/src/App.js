import React, { Component } from 'react';
// import Home from './Views/Home';
import { BrowserRouter, Route } from 'react-router-dom';
import Map from './components/Map';

class App extends Component {
	render () {
		return (
			<div>
				<BrowserRouter>
					<div>
						<Route exact={true} path="/" render={() => <div className="App">{/* <Home /> */}</div>} />
						<Route
							exact={true}
							path="/map"
							render={() => (
								<div className="App">
									<Map />
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
