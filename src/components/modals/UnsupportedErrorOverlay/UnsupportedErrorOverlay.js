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
		const tippyPopups = document.querySelectorAll("[id^=tippy-tooltip-]");

		// show refers to showing the overlay!
		const blur = `blur(${this.props.show ? "20px" : "0px"})`;

		rootElement.style.filter = blur;
		reactModalPortals.forEach(portal => (portal.style.filter = blur));
		tippyPopups.forEach(tippyPopup => (tippyPopup.style.filter = blur));

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
