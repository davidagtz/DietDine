import React, { Component } from 'react';
import '../styles/Add.sass';

export default class Add extends React.Component {
	constructor (props) {
		super(props);
		this.state = { value: '' };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange (event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit (event) {
		alert('A restaurant was submitted: ' + this.state.value);
		event.preventDefault();
	}

	render () {
		return (
			<div class="AddPage">
				<div id="friendlyMessage">
					<h2>
						Thank you for joining the DietDine team! We look forward to collaboratively providing an
						extraordinary dining experience to the public! Please input some information and we will contact
						you within a few days. Thank you and welcome!
					</h2>
				</div>
				<br />
				<br />
				<br />
				<div id="form">
					<form onSubmit={this.handleSubmit}>
						<div>
							<label>
								Restaurant Name:
								<input
									type="text"
									name="restaurantName"
									value={this.state.value}
									onChange={this.handleChange}
									placeholder="Taco Bell"
								/>
							</label>
						</div>
						<div>
							<label>
								City:
								<input
									type="text"
									name="city"
									// value={this.state.value}
									// onChange={this.handleChange}
									placeholder="Dallas, TX"
								/>
							</label>
						</div>
						<br />
						<div>
							<form enctype="multipart/form-data" action="uploader.php" method="POST">
								<input type="hidden" name="MAX_FILE_SIZE" value="100000" />
								Choose a file to upload: <input name="uploadedfile" type="file" />
								<br />
								{/* <input type="submit" value="Upload File" /> */}
							</form>
						</div>
						<input type="submit" value="Submit" />
					</form>
				</div>
			</div>
		);
	}
}

//  <input type="text" name="firstName" placeholder="Enter first name"></input>
