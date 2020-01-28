import { Redirect } from "@reach/router";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import withSizes from "react-sizes";
import { StripeProvider } from "react-stripe-elements";

import UnsupportedErrorOverlay from "../../components/modals/UnsupportedErrorOverlay";
import AuditTrail from "../AuditTrail";
import CreateProject from "../CreateProject";
import CreateProjectSuccess from "../CreateProjectSuccess";
import Dashboard from "../Dashboard";
import EmailVerification from "../EmailVerification";
import Error from "../Error/Error";
import FeatureFlags from "../FeatureFlags";
import FourOFour from "../FourOFour";
import Home from "../Home";
import Login from "../Login";
import SignUp from "../SignUp";
import Welcome from "../Welcome";
import { StyledRouter } from "./Main.Style.js";

// StripeProvider is used in here because want to use the componentDidMount as stripe is added async
class Main extends React.Component {
	state = {
		hasError: false,
		stripe: null,
	};

	componentDidMount() {
		if (window.Stripe) {
			this.setState({
				stripe: window.Stripe(process.env.REACT_APP_STRIPE_API_KEY),
			});
		} else {
			document.querySelector("#stripe-js").addEventListener("load", event => {
				// Create Stripe instance once Stripe.js loads
				this.setState({
					stripe: window.Stripe(process.env.REACT_APP_STRIPE_API_KEY),
				});
			});
		}
	}

	componentDidCatch(error, info) {
		navigate("/error");

		// todo: In the future, use an error reporting tool to push these errors to!
		console.error(error, info);
	}

	render() {
		const isSupportedScreenSize = this.props.isSupportedScreenSize;

		return (
			<StripeProvider stripe={this.state.stripe}>
				<>
					<StyledRouter>
						<Redirect from="/" to="/login" noThrow />
						<Login path="/login" />
						<SignUp path="/sign-up" />
						<EmailVerification path="/email-verification" />
						<Dashboard path="/dashboard">
							<Welcome path="/" />
							<CreateProjectSuccess path="/projects/create/success" />
							<CreateProject path="/projects/create" />
							<Home path=":project_id/home" />
							<FeatureFlags path=":project_id/feature-flags" />
							<AuditTrail path=":project_id/audit-trail" />
						</Dashboard>
						<Error path="/error" />
						<FourOFour path="/404" default />
					</StyledRouter>
					<UnsupportedErrorOverlay show={!isSupportedScreenSize} />
				</>
			</StripeProvider>
		);
	}
}

Main.propTypes = {
	isSupportedScreenSize: PropTypes.bool,
};

const mapSizesToProps = ({ width, height }) => ({
	isSupportedScreenSize: width >= 1000 && height >= 600,
});

const mapStateToProps = reduxState => {
	return {};
};

export default connect(
	mapStateToProps,
	{},
)(withSizes(mapSizesToProps)(Main));
