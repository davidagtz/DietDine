import React, { Component } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";

class PopUp extends Component {
	render() {
		let items = [];
		console.log(this.props);
		if (this.props.menu)
			for (const it of this.props.menu) items.push(<li>{it}</li>);
		return (
			<Modal
				trigger={
					this.props.trigger ? (
						this.props.trigger
					) : (
						<Button>{this.props.title}</Button>
					)
				}
			>
				<Modal.Header>{this.props.title}</Modal.Header>
				<Modal.Content image>
					<Image wrapped size="medium" src={this.props.image} />
					<Modal.Description>
						<Header>Menu Items</Header>
						<ul>{items}</ul>
						{this.props.children}
					</Modal.Description>
				</Modal.Content>
			</Modal>
		);
	}
}

export default PopUp;
