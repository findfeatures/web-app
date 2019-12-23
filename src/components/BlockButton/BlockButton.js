import React from "react";
import { StyledButton } from "./BlockButton.Style.js";
import PropTypes from "prop-types";

class BlockButton extends React.PureComponent {
	render() {
		return (
			<StyledButton onClick={this.props.handleButtonClick}>
				{this.props.children}
			</StyledButton>
		);
	}
}

BlockButton.defaultProps = {
	handleButtonClick: () => {},
};

BlockButton.propTypes = {
	handleButtonClick: PropTypes.func,
};

export default BlockButton;
