import PropTypes from "prop-types";
import React from "react";

import { StyledButton } from "./BlockButton.Style.js";

class BlockButton extends React.PureComponent {
	render() {
		return (
			<StyledButton
				onClick={this.props.onClickHandler}
				disabled={this.props.disabled}
			>
				{this.props.children}
			</StyledButton>
		);
	}
}

BlockButton.defaultProps = {
	onClickHandler: () => {},
	disabled: false,
};

BlockButton.propTypes = {
	onClickHandler: PropTypes.func,
	disabled: PropTypes.bool,
};

export default BlockButton;
