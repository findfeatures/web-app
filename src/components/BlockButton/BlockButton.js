import React from "react";
import { StyledButton } from "./BlockButton.Style.js";
import PropTypes from "prop-types";

class BlockButton extends React.PureComponent {
	render() {
		return (
			<StyledButton onClick={this.props.handleButtonClick} disabled={this.props.disabled}>
				{this.props.children}
			</StyledButton>
		);
	}
}

BlockButton.defaultProps = {
	handleButtonClick: () => {},
	disabled: false
};

BlockButton.propTypes = {
	handleButtonClick: PropTypes.func,
	disabled: PropTypes.bool
};

export default BlockButton;
