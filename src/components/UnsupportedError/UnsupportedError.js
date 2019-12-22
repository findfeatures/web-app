import React from "react";
import ReactDOM from "react-dom";
import {
	FullScreenCenteredDiv,
	Wrapper,
	LogoDiv,
} from "./UnsupportedError.Style.js";
import PropTypes from "prop-types";

class UnsupportedError extends React.Component {
	render() {
		if (this.props.show) {
			document.getElementById("root").style.filter = "blur(20px)";
		} else {
			// todo: not sure how to fix not having to reset the blur here
			document.getElementById("root").style.filter = "blur(0px)";
		}

		return (
			this.props.show &&
			ReactDOM.createPortal(
				<FullScreenCenteredDiv>
					<Wrapper>
						<LogoDiv>Features</LogoDiv>
						We currently <i>do not</i> support screen sizes this small :( (if
						possible) please enlarge the size of your screen to at least{" "}
						<i>1000px x 600px</i> or try rotating your device. <br />
						<br />
						If you think this is an error, please contact us directly at{" "}
						<i>email address here</i>.
					</Wrapper>
				</FullScreenCenteredDiv>,
				document.getElementById("portal"),
			)
		);
	}
}

UnsupportedError.propTypes = {
	show: PropTypes.bool.isRequired,
};

export default UnsupportedError;
