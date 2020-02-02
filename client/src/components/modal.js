import React, { Component } from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

class PopUp extends Component {
	render () {
		return (
			<Modal trigger={this.props.trigger ? this.props.trigger : <Button>{this.props.title}</Button>}>
				<Modal.Header>Taco Bell</Modal.Header>
				<Modal.Content image>
					<Image wrapped size="medium" src="/images/tacobell.png" />
					<Modal.Description>
						<Header>Menu Items</Header>
						<ul>
							<li>Ey taco taco taco taco</li>
							<li>Freeze! everybody clap yo hands</li>
						</ul>
						{this.props.children}
					</Modal.Description>
				</Modal.Content>
			</Modal>
		);
	}
}

export default PopUp;
