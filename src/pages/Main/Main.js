import React from "react";
import withSizes from "react-sizes";
import PropTypes from "prop-types";
import UnsupportedError from "../../components/UnsupportedError";
import Login from "../Login";
import { Redirect } from "@reach/router";
import { StyledRouter } from "./Main.Style.js";
import Dashboard from "../Dashboard";

class Main extends React.Component {
	render() {
		const isSupportedScreenSize = this.props.isSupportedScreenSize;

		const jwt_token = localStorage.getItem("JWT_TOKEN");

		return (
			<>
				<StyledRouter>
					<Redirect from="/" to="/login" noThrow />
					<Login path="/login" />
					{jwt_token ? <Dashboard path="/dashboard" /> : null}
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

export default withSizes(mapSizesToProps)(Main);
