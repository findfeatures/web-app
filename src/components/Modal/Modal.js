import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";

import {
	StyledDiv,
} from "./Modal.Style.js";

class Modal extends React.PureComponent {

	render() {
		if (this.props.blur) {
			document.getElementById("root").style.filter = "blur(20px)";
		} else {
			// todo: not sure how to fix not having to reset the blur here
			document.getElementById("root").style.filter = "blur(0px)";
		}

		return (
			this.props.show &&
			ReactDOM.createPortal(
				<StyledDiv>
					{ this.props.children }
				</StyledDiv>,
				document.getElementById("portal"),
			)
		);
	}
}

Modal.defaultProps = {
	show: false,
	blur: false
};

Modal.propTypes = {
	show: PropTypes.bool.isRequired,
	children: PropTypes.node,
	blur: PropTypes.bool
};

export default Modal;
