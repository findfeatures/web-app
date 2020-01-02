import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";

import {
	LogoDiv,
	StyledDiv,
	Wrapper,
} from "./UnsupportedErrorOverlay.Style.js";

class UnsupportedErrorOverlay extends React.PureComponent {
	render() {
		const rootElement = document.getElementById("root");
		const reactModalPortals = document.querySelectorAll(".ReactModal__Overlay");

		if (this.props.show) {
			rootElement.style.filter = "blur(20px)";
			reactModalPortals.forEach(portal => (portal.style.filter = "blur(20px)"));
		} else {
			// todo: not sure how to fix not having to reset the blur here
			rootElement.style.filter = "blur(0px)";
			reactModalPortals.forEach(portal => (portal.style.filter = "blur(0px)"));
		}

		return (
			this.props.show &&
			ReactDOM.createPortal(
				<StyledDiv>
					<Wrapper>
						<LogoDiv>Find Features</LogoDiv>
						We currently <i>do not</i> support screen sizes this small :( (if
						possible) please enlarge the size of your screen to at least
						<i>1000px x 600px</i> or try rotating your device. <br />
						<br />
						If you think this is an error, please contact us directly at
						<i> support@findfeatures.io</i>.
					</Wrapper>
				</StyledDiv>,
				document.getElementById("overlay"),
			)
		);
	}
}

UnsupportedErrorOverlay.propTypes = {
	show: PropTypes.bool.isRequired,
};

export default UnsupportedErrorOverlay;
