import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Elements, injectStripe } from "react-stripe-elements";

import { decodeJWTToken } from "../../redux/actions/auth";
import { DashboardPageDiv } from "./Dashboard.Style.js";

class DashboardButton extends React.Component {
	handleClick = async () => {
		// todo: swap this to be disabled button instead!
		if (this.props.stripe != null) {
			const { error } = await this.props.stripe.redirectToCheckout({
				sessionId:
					"cs_test_3X1Ovzz0T14UXteQtWc0jbNQxhrVzKwutfljfoB4Rcq1EETuskE5gqLy",
			});
		}
	};

	render() {
		return (
			<button onClick={() => this.handleClick()}> CLICK ME TO AUTH! </button>
		);
	}
}

const InjectedStripeDashboardButton = injectStripe(DashboardButton);

class Dashboard extends React.Component {
	/*
	todo: make dashboard the 'container' for all the other pages.
	 */
	state = {
		totalProjects: 0,
		jwtDataLoaded: false,
	};

	componentDidMount() {
		// decode JWT and store the data in redux.
		this.props.decodeJWTToken();
	}

	componentDidUpdate(prevProps) {
		if (this.props.jwtData != null && prevProps.jwtData == null) {
			this.setState({
				jwtDataLoaded: true,
				totalProjects: this.props.jwtData.total_projects,
			});
		}
	}

	render() {
		return (
			<DashboardPageDiv>
				You're logged in!
				<Elements>
					<InjectedStripeDashboardButton />
				</Elements>
			</DashboardPageDiv>
		);
	}
}

Dashboard.defaultProps = {
	decodeJWTToken: () => {},
	jwtData: PropTypes.object,
};

Dashboard.propTypes = {
	decodeJWTToken: PropTypes.func,
	jwtData: PropTypes.object,
};

const mapStateToProps = reduxState => {
	return {
		jwtData: reduxState.auth.jwtData,
	};
};

export default connect(
	mapStateToProps,
	{
		decodeJWTToken,
	},
)(Dashboard);
