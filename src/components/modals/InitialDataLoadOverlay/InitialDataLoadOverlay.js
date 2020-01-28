import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";

import BlockButton from "../../buttons/BlockButton";
import Spinner from "../../miscellaneous/Spinner";
import {
	StyledButtonContainer,
	StyledDiv,
} from "./InitialDataLoadOverlay.Style.js";

class InitialDataLoadOverlay extends React.PureComponent {
	// maybe add a 'welcome to find features screen which shows up for 1second'
	// probably use a seperate component tho because logic would get fuzzy here
	// and need to check for errors first :)
	// componentDidUpdate(prevProps, prevState, snapshot) {
	// 	if ((prevProps.show !== this.props.show) && !this.props.error) {
	//
	// 	}
	// }

	render() {
		return (
			(this.props.show || this.props.error) &&
			ReactDOM.createPortal(
				<StyledDiv>
					{this.props.error ? (
						<>
							<h1>Find Features</h1>
							<h1>
								There's been an error loading your data,
								<br />
								please reload the page and if the problem persists,
								<br />
								please get in touch with support.
							</h1>
							<StyledButtonContainer>
								<BlockButton
									onClickHandler={() => window.location.reload(false)}
								>
									RELOAD
								</BlockButton>
							</StyledButtonContainer>
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

InitialDataLoadOverlay.defaultProps = {
	show: false,
	error: false,
};

InitialDataLoadOverlay.propTypes = {
	show: PropTypes.bool.isRequired,
	error: PropTypes.bool.isRequired,
};

export default InitialDataLoadOverlay;
