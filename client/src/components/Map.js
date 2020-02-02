import React, { Component } from 'react';
import '../styles/Map.sass';
import Sidebar from 'react-sidebar';
import ReactSearchBox from 'react-search-box';
import Multiselect from 'multiselect-dropdown-react';

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

	locationData = [
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
		},
		{
			key: '4',
			value: 'Richardson, TX'
		},
		{
			key: '5',
			value: 'Detroit, MI'
		},
		{
			key: '6',
			value: 'Denver, CO'
		}
	];

	dietData = [
		{
			name: 'Vegetarian',
			value: 'Vegetarian'
		},
		{
			name: 'Vegan',
			value: 'Vegan'
		},
		{
			name: 'Gluten Free',
			value: 'Gluten Free'
		},
		{
			name: 'Lactose Free',
			value: 'Lactose Free'
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
							id="searchbox"
							placeholder="Search your city..."
							// value="Search city"
							data={this.locationData}
							onSelect={(data) => {
								document.globals.geocode(data.value).then((res) => {
									const loc = res.results[0].geometry.location;
									const latLng = new document.google.maps.LatLng(loc.lat, loc.lng);
									document.map.panTo(latLng);
									document.map.setZoom(13);
								});
							}}
						/>{' '}
						<Multiselect
							placeholder="Search your diet..."
							options={this.dietData}
							onSelectOptions={(params) => console.log(params)}
						/>
						{/* <div id="restaurant">
							<section id="restaurantName">
								<h3>Taco Bell</h3>
							</section>
						</div> */}
					</div>
				</Sidebar>

				<div id="googleMap" />
			</div>
		);
	}
}
