import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";

import Spinner from "../../miscellaneous/Spinner";
import { StyledDiv } from "./FullScreenSpinnerOverlay.Style.js";

class FullScreenSpinnerOverlay extends React.PureComponent {
	render() {
		return (
			(this.props.show || this.props.error) &&
			ReactDOM.createPortal(
				<StyledDiv>
					{this.props.error ? (
						<>
							<h1>
								There's been an error loading your data,
								<br />
								please refresh the page and if the problem persists,
								<br />
								please get in touch with support.
							</h1>
						</>
					) : (
						<>
							<h1>We're loading your dashboard!</h1>
							<Spinner color={"black"} />
						</>
					)}
				</StyledDiv>,
				document.getElementById("spinner-overlay"),
			)
		);
	}
}

FullScreenSpinnerOverlay.defaultProps = {
	show: false,
	error: false,
};

FullScreenSpinnerOverlay.propTypes = {
	show: PropTypes.bool.isRequired,
	error: PropTypes.bool.isRequired,
};

export default FullScreenSpinnerOverlay;
