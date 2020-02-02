import React, { Component } from 'react';
import '../styles/Map.sass';
import Sidebar from 'react-sidebar';
import ReactSearchBox from 'react-search-box';

const mql = window.matchMedia(`(min-width: 800px)`);

export default class Map extends Component {
	constructor (props) {
		super(props);
		this.state = {
			sidebarDocked: mql.matches,
			sidebarOpen: false
		};
		this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
	}

	componentWillMount () {
		mql.addListener(this.mediaQueryChanged);
	}

	componentWillUnmount () {
		this.state.mql.removeListener(this.mediaQueryChanged);
	}

	onSetSidebarOpen (open) {
		this.setState({ sidebarOpen: open });
	}

	mediaQueryChanged () {
		this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
	}

	data = [
		{
			key: '1',
			value: 'Dallas, TX'
		},
		{
			key: '2',
			value: 'Pasadena, TX'
		},
		{
			key: '3',
			value: 'Laredo, TX'
		}
	];

	render () {
		return (
			<div>
				<Sidebar
					open={this.state.sidebarOpen}
					docked={this.state.sidebarDocked}
					onSetOpen={this.onSetSidebarOpen}
					styles={{
						content: {
							backgroundColor: '#77777700'
							// backgroundColor: '#66ccff77'
							//  opacity: 0.2
						},
						root: { width: '20%' }
					}}
				>
					{/* <b>Sidebar</b> */}
					{/* <button onClick={() => this.onSetSidebarOpen(true)}>Close sidebar</button> */}
					{/* <button onClick={() => this.onSetSidebarOpen(false)}>Close sidebar</button> */}
					<div id="sb-wrapper">
						<ReactSearchBox
							placeholder="Search your city..."
							// value="Search city"
							data={this.data}
							onSelect={(data) => {
								fetch(
									'https://maps.googleapis.com/maps/api/geocode/json?address=' +
										data.value +
										'&key=AIzaSyDSPBhWlOC5mJVR7F7ZSjglEaVV1vJtdQ0'
								)
									.then((res) => res.json())
									.then((res) => {
										const loc = res.results[0].geometry.location;
										const latLng = new document.google.maps.LatLng(loc.lat, loc.lng);
										document.map.panTo(latLng);
										document.map.setZoom(13);
									});
							}}
						/>
					</div>
				</Sidebar>
				<div id="googleMap" />
			</div>
		);
	}
}
