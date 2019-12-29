import PropTypes from "prop-types";
import React from "react";

import {
	LogoDiv,
	Wrapper
} from "./UnsupportedError.Style.js";

import Modal from '../Modal';


class UnsupportedError extends React.PureComponent {
	render() {
		return (
			<Modal show={this.props.show} blur={this.props.show}>
				<Wrapper>
					<LogoDiv>Find Features</LogoDiv>
					We currently <i>do not</i> support screen sizes this small :( (if
					possible) please enlarge the size of your screen to at least{" "}
					<i>1000px x 600px</i> or try rotating your device. <br />
					<br />
					If you think this is an error, please contact us directly at
					<i> support@findfeatures.io</i>.
				</Wrapper>
			</Modal>
		);
	}
}

UnsupportedError.propTypes = {
	show: PropTypes.bool.isRequired,
};

export default UnsupportedError;
