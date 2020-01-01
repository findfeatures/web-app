import PropTypes from "prop-types";
import React from "react";

import Modal from '../Modal';

import {  } from "./LoginVerificationModal.Style.js";

class LoginVerificationModal extends React.PureComponent {
	render() {

		return (
			<Modal show={this.props.show}>
				HELLO WORLD!
			</Modal>
		);
	}
}

LoginVerificationModal.defaultProps = {
	show: false,
};

LoginVerificationModal.propTypes = {
	show: PropTypes.bool.isRequired,
};

export default LoginVerificationModal;
