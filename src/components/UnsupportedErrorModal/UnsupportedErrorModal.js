import PropTypes from "prop-types";
import React from "react";

import Modal from "../Modal";
import { LogoDiv, Wrapper } from "./UnsupportedErrorModal.Style.js";

class UnsupportedErrorModal extends React.PureComponent {
	render() {
		return (
			<Modal show={this.props.show} blur={this.props.show} portalId={"overlay"}>
				<Wrapper>
					<LogoDiv>Find Features</LogoDiv>
					We currently <i>do not</i> support screen sizes this small :( (if
					possible) please enlarge the size of your screen to at least
					<i>1000px x 600px</i> or try rotating your device. <br />
					<br />
					If you think this is an error, please contact us directly at
					<i> support@findfeatures.io</i>.
				</Wrapper>
			</Modal>
		);
	}
}

UnsupportedErrorModal.propTypes = {
	show: PropTypes.bool.isRequired,
};

export default UnsupportedErrorModal;
