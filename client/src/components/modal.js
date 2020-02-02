import React, { Component } from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

class PopUp extends Component {
	render () {
		return (
			<Modal trigger={this.props.trigger ? this.props.trigger : <Button>{this.props.title}</Button>}>
				<Modal.Header>Select a Photo</Modal.Header>
				<Modal.Content image>
					<Image wrapped size="medium" src="{this.props.image}" />
					<Modal.Description>
						<Header>Default Profile Image</Header>
						{this.props.children}
					</Modal.Description>
				</Modal.Content>
			</Modal>
		);
	}
}

export default PopUp;
