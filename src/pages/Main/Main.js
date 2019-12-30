import { Redirect } from "@reach/router";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import withSizes from "react-sizes";

import UnsupportedError from "../../components/UnsupportedError";
import Dashboard from "../Dashboard";
import EmailVerification from "../EmailVerification";
import FourOFour from "../FourOFour";
import Login from "../Login";
import SignUp from "../SignUp";
import { StyledRouter } from "./Main.Style.js";

class Main extends React.Component {
	render() {
		const isSupportedScreenSize = this.props.isSupportedScreenSize;

		const jwtToken = localStorage.getItem("JWT_TOKEN");

		return (
			<>
				<StyledRouter>
					<Redirect from="/" to="/login" noThrow />
					<Login path="/login" />
					<SignUp path="/sign-up" />
					<EmailVerification path="/email-verification" />
					{jwtToken !== null ? <Dashboard path="/dashboard" /> : null}
					<FourOFour path="/404" default />
				</StyledRouter>
				<UnsupportedError show={!isSupportedScreenSize} />
			</>
		);
	}
}

Main.propTypes = {
	isSupportedScreenSize: PropTypes.bool,
};

const mapSizesToProps = ({ width, height }) => ({
	isSupportedScreenSize: width > 1000 && height > 600,
});

const mapStateToProps = reduxState => {
	return {};
};

export default connect(
	mapStateToProps,
	{},
)(withSizes(mapSizesToProps)(Main));
