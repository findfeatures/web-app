import React from "react";
import withSizes from "react-sizes";
import PropTypes from "prop-types";
import UnsupportedError from "../../components/UnsupportedError";
import Login from "../Login";
import { Redirect, navigate } from "@reach/router";
import { StyledRouter } from "./Main.Style.js";
import Dashboard from "../Dashboard";
import { connect } from "react-redux";

class Main extends React.Component {
	render() {
		const isSupportedScreenSize = this.props.isSupportedScreenSize;

		const jwt_token = this.props.authData.JWT;

		if (!jwt_token) {
			navigate('/login')
		}

		return (
			<>
				<StyledRouter>
					<Redirect from="/" to="/login" noThrow />
					<Login path="/login"/>
					<Dashboard path="/dashboard" />
				</StyledRouter>
				<UnsupportedError show={!isSupportedScreenSize} />
			</>
		);
	}
}

Main.propTypes = {
	isSupportedScreenSize: PropTypes.bool,
	authData: PropTypes.shape({
		JWT: PropTypes.string
	}),
};

const mapSizesToProps = ({ width, height }) => ({
	isSupportedScreenSize: width > 1000 && height > 600,
});

const mapStateToProps = (reduxState) => {
	return {
		authData: reduxState.auth.data,
	}
};

export default connect(
	mapStateToProps,
	{},
)(withSizes(mapSizesToProps)(Main));

