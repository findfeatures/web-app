import React from "react";
import { StyledButton } from "./BlockButton.Style.js";
import PropTypes from 'prop-types';

class BlockButton extends React.Component {
	render() {
		return (
			<StyledButton onClick={this.props.handleButtonClick}>
				{this.props.children}
			</StyledButton>
		);
	}
}

BlockButton.defaultProps = {
	handleButtonClick: () => console.log('clicked button!')
};

BlockButton.propTypes = {
	handleButtonClick: PropTypes.func
};

export default BlockButton;
