import React, { Component } from "react";
import "../styles/Map.sass";
import Sidebar from "react-sidebar";
import ReactSearchBox from "react-search-box";
import Multiselect from "multiselect-dropdown-react";
import PopUp from "./modal";

const mql = window.matchMedia(`(min-width: 800px)`);

export default class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sidebarDocked: mql.matches,
			sidebarOpen: false
		};
		this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
	}

	componentWillMount() {
		mql.addListener(this.mediaQueryChanged);
	}

	componentWillUnmount() {
		this.state.mql.removeListener(this.mediaQueryChanged);
	}

	onSetSidebarOpen(open) {
		this.setState({ sidebarOpen: open });
	}

	mediaQueryChanged() {
		this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
	}

	locationData = [
		{
			key: "1",
			value: "Dallas, TX"
		},
		{
			key: "2",
			value: "Pasadena, TX"
		},
		{
			key: "3",
			value: "Laredo, TX"
		},
		{
			key: "4",
			value: "Richardson, TX"
		},
		{
			key: "5",
			value: "Detroit, MI"
		},
		{
			key: "6",
			value: "Denver, CO"
		}
	];

	dietData = [
		{
			name: "Vegetarian",
			value: "Vegetarian"
		},
		{
			name: "Vegan",
			value: "Vegan"
		},
		{
			name: "Gluten Free",
			value: "Gluten Free"
		},
		{
			name: "Lactose Free",
			value: "Lactose Free"
		}
	];

	render() {
		return (
			<div>
				<Sidebar
					open={this.state.sidebarOpen}
					docked={this.state.sidebarDocked}
					onSetOpen={this.onSetSidebarOpen}
					children={<div />}
					styles={{
						content: {
							backgroundColor: "#77777700",
							boxShadow: "0"
							// backgroundColor: '#66ccff77'
							//  opacity: 0.2
						},
						root: {
							width: "20%",
							boxShadow: "0",
							overflow: "visible",
							zIndex: 1
						},
						sidebar: { boxShadow: "0" },
						overlay: { display: "none" },
						dragHandle: { boxShadow: "0" }
					}}
					sidebar={
						<div id="sb-wrapper">
							<ReactSearchBox
								id="searchbox"
								placeholder="Search your city..."
								// value="Search city"
								data={this.locationData}
								onSelect={data => {
									document.globals.mapGoTo(
										data.value,
										() => {
											this.setState({
												STRAIGHT: "CAPPING"
											});
										}
									);
								}}
							/>{" "}
							<Multiselect
								placeholder="Search your diet..."
								options={this.dietData}
								onSelectOptions={params => {
									document.globals.params = params;
									document.globals.placeFood(() => {
										this.setState({
											STRAIGHT: "CAPPING"
										});
									});
								}}
							/>
							{displayRestaurants(document.globals.menus)}
						</div>
					}
				/>

				<div id="googleMap" />
			</div>
		);
	}
}

const menus = [
	[
		//Vegetarian and Lactose
		[
			"Barbecue Dip Sauce", // Jack in the Box
			"Root Beer",
			"Artisan Potato Bun",
			"Glazed Bun",
			"Canola blend Frying oil",
			"Caramel Syrup",
			"Carrots",
			"French Fries",
			"Hash Browns"
		],
		[
			"Fried Bowl", // Taco Cabana
			"Chips and Guacamole",
			"Corn Tortilla",
			"Flour Tortilla",
			"Salsa Verde",
			"Pico de Gallo",
			"Tortilla Chips"
		]
	],
	[
		// Vegan and Gluten free
		[
			"Aquafina Water", // Taco Bell
			"Beach Berry Freeze",
			"Black Beans",
			"Border Sauce",
			"Cherry Freeze",
			"Cilantro",
			"Nacho Chips",
			"Blue Raspberry Freeze",
			"Jalapenos",
			"Lemonade Freeze",
			"Refried Beans",
			"Taco Shell",
			"Tostada Shell"
		],
		[
			"Minute Maid Slushie", // McDonalds
			"Sweet Peach Slushie",
			"Americano",
			"Premium Roast Coffee"
		]
	]
];

function displayRestaurants(ms) {
	return [
		<PopUp
			title="Taco Bell"
			menu={menus[1][0]}
			image="/images/tacobell.png"
			trigger={
				<div id="restaurant">
					<img
						className="restaurantImg"
						src="/images/tacobell.png"
					/>
					<section id="restaurantName">
						<h3>Taco Bell</h3>
						<hr />
						<p>Sunday: 7AM - 3AM</p>
					</section>
				</div>
			}
		/>,
		<PopUp
			title="McDonald's"
			menu={menus[1][1]}
			image="/images/mcdonalds.png"
			trigger={
				<div id="restaurant">
					<img
						className="restaurantImg"
						src="/images/mcdonalds.png"
					/>
					<section id="restaurantName">
						<h3>McDonald's</h3>
						<hr />
						<p>Sunday: 24 Hours</p>
					</section>
				</div>
			}
		/>,
		<PopUp
			title="Taco Cabana"
			menu={menus[0][1]}
			image="/images/tacocabana.png"
			trigger={
				<div id="restaurant">
					<img
						className="restaurantImg"
						src="/images/tacocabana.png"
					/>
					<section id="restaurantName">
						<h3>Taco Cabana</h3>
						<hr />
						<p>Sunday: 24 Hours</p>
					</section>
				</div>
			}
		/>,
		<PopUp
			title="Jack in the Box"
			menu={menus[0][0]}
			image="/images/jackinthebox.png"
			trigger={
				<div id="restaurant">
					<img
						className="restaurantImg"
						src="/images/jackinthebox.png"
					/>
					<section id="restaurantName">
						<h3>Jack in the Box</h3>
						<hr />
						<p>Sunday: 24 Hours</p>
					</section>
				</div>
			}
		/>
	];
}
