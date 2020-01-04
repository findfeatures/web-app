import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import Spinner from "../../components/miscellaneous/Spinner";
import NavBar from "../../components/NavBar";
import { decodeJWTToken } from "../../redux/actions/auth";
import { getProjects } from "../../redux/actions/projects";
import FourOFour from "../FourOFour";
import Welcome from "../Welcome";
import { ContentDiv, DashboardPageDiv, NavBarDiv } from "./Dashboard.Style.js";

// import { Elements, injectStripe } from "react-stripe-elements";
// class DashboardButton extends React.Component {
// 	handleClick = async () => {
// 		// todo: swap this to be disabled button instead!
// 		if (this.props.stripe != null) {
// 			const { error } = await this.props.stripe.redirectToCheckout({
// 				sessionId:
// 					"cs_test_3X1Ovzz0T14UXteQtWc0jbNQxhrVzKwutfljfoB4Rcq1EETuskE5gqLy",
// 			});
// 		}
// 	};
//
// 	render() {
// 		return (
// 			<button onClick={() => this.handleClick()}> CLICK ME TO AUTH! </button>
// 		);
// 	}
// }
//
// const InjectedStripeDashboardButton = injectStripe(DashboardButton);

class Dashboard extends React.Component {
	state = {
		validPaths: ["", "welcome", "project/join", "project/create"],
	};

	componentDidMount() {
		this.props.decodeJWTToken();
		this.props.getProjects();
	}

	renderRoute = (path, userHasProjects) => {
		// had to use this because nested routes was being weird
		// but means we lose functionality like '/:route/reports'
		// can fix later if a real issue and we need this

		// if (!userHasProjects && !['project/join', 'project/create'].includes(path)) {
		// 	path = 'welcome';
		// }

		switch (path) {
			case "":
				return <div>Dashboard</div>;
			case "welcome":
				return <Welcome />;
			case "project/join":
				return <div>join project!</div>;
			case "project/create":
				return <div>create project!</div>;
			default:
				return <FourOFour />;
		}
	};

	render() {
		const finishedLoadingData =
			this.props.jwtData != null && this.props.projectData != null;

		let userHasProjects = false;
		if (this.props.projectData != null) {
			userHasProjects = this.props.projectData.length !== 0;
		}

		const path = this.props["*"];
		if (!this.state.validPaths.includes(path)) {
			this.props.navigate("/404");
		}

		// if user has no projects, restrict them to just the welcome page and project
		// sign ups.
		if (
			finishedLoadingData &&
			!userHasProjects &&
			!["welcome", "project/join", "project/create"].includes(path)
		) {
			this.props.navigate("/dashboard/welcome");
		}

		return (
			<DashboardPageDiv>
				<NavBarDiv>
					<NavBar />
				</NavBarDiv>
				<ContentDiv>
					<div style={{}}>
						{finishedLoadingData ? (
							this.renderRoute(path, userHasProjects)
						) : (
							<Spinner color={"black"} />
						)}
					</div>
				</ContentDiv>
			</DashboardPageDiv>
		);
	}
}

Dashboard.defaultProps = {
	decodeJWTToken: () => {},
	getProjects: () => {},
	jwtData: PropTypes.object,
	isRequestingProjects: false,
	projectData: null,
};

Dashboard.propTypes = {
	decodeJWTToken: PropTypes.func,
	getProjects: PropTypes.func,
	jwtData: PropTypes.object,
	isRequestingProjects: PropTypes.bool,
	projectData: PropTypes.array,
};

const mapStateToProps = reduxState => {
	return {
		jwtData: reduxState.auth.jwtData,
		isRequestingProjects: reduxState.projects.isRequestingProjects,
		projectData: reduxState.projects.data,
	};
};

export default connect(
	mapStateToProps,
	{
		decodeJWTToken,
		getProjects,
	},
)(Dashboard);
