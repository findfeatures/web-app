import { Redirect } from "@reach/router";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import withSizes from "react-sizes";

import UnsupportedError from "../../components/UnsupportedError";
import Dashboard from "../Dashboard";
import FourOFour from "../FourOFour";
import Login from "../Login";
import SignUp from "../SignUp";
import { StyledRouter } from "./Main.Style.js";

class Main extends React.Component {
	render() {
		const isSupportedScreenSize = this.props.isSupportedScreenSize;

		const jwtToken = this.props.authData.JWT;

		return (
			<>
				<StyledRouter>
					<Redirect from="/" to="/login" noThrow />
					<Login path="/login" />
					<SignUp path="/sign-up" />
					{jwtToken ? <Dashboard path="/dashboard" /> : null}
					<FourOFour path="/404" default />
				</StyledRouter>
				<UnsupportedError show={!isSupportedScreenSize} />
			</>
		);
	}
}

Main.propTypes = {
	isSupportedScreenSize: PropTypes.bool,
	authData: PropTypes.shape({
		JWT: PropTypes.string,
	}),
};

const mapSizesToProps = ({ width, height }) => ({
	isSupportedScreenSize: width > 1000 && height > 600,
});

const mapStateToProps = reduxState => {
	return {
		authData: reduxState.auth.data,
	};
};

export default connect(
	mapStateToProps,
	{},
)(withSizes(mapSizesToProps)(Main));
