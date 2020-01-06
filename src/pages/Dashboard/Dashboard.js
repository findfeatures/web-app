import jwt from "jsonwebtoken";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import Spinner from "../../components/miscellaneous/Spinner";
import NavBar from "../../components/NavBar";
import { getProjects } from "../../redux/actions/projects";
import FourOFour from "../FourOFour";
import Welcome from "../Welcome";
import { ContentDiv, DashboardPageDiv, NavBarDiv } from "./Dashboard.Style.js";

class Dashboard extends React.Component {
	state = {
		hasValidToken: false,
		loadingInitialData: true,
		initialDataError: false,
	};

	constructor(props) {
		super(props);

		try {
			const token = jwt.decode(sessionStorage.getItem("JWT_TOKEN"));

			if (token.exp > Date.now().valueOf() / 1000) {
				this.state.hasValidToken = true;
			}
		} catch (error) {
			console.log(error);
		}
	}

	componentDidMount() {
		this.props.getProjects();
	}

	componentDidUpdate(prevProps) {
		const finishedRequestingProjects =
			this.props.isRequestingProjects !== prevProps.isRequestingProjects &&
			prevProps.isRequestingProjects;

		if (finishedRequestingProjects) {
			this.setState({
				loadingInitialData: false,
				initialDataError: this.props.projectsDataStatusCode !== 200,
			});
		}
	}

	render() {
		const showSpinner = this.state.loadingInitialData;
		const showFourOFour = !this.state.hasValidToken;

		// not the cleanest way but this is quite simple.
		const showWelcomeScreen =
			this.props.projectsData.length === 0 &&
			!["project/create", "project/join"].includes(this.props["*"]);

		const showInitialDataErrorMessage = this.state.initialDataError;

		if (showFourOFour) {
			return <FourOFour />;
		}

		return (
			<DashboardPageDiv>
				<NavBarDiv>
					<NavBar />
				</NavBarDiv>
				<ContentDiv>
					{showSpinner ? (
						<Spinner color={"black"} />
					) : showWelcomeScreen ? (
						showInitialDataErrorMessage ? (
							"There's been an error, please reload the page. " +
							"If the problem persists, please contact support."
						) : (
							<Welcome />
						)
					) : (
						this.props.children
					)}
				</ContentDiv>
			</DashboardPageDiv>
		);
	}
}

Dashboard.defaultProps = {
	getProjects: () => {},
	isRequestingProjects: false,
	projectsData: [],
	projectsDataStatusCode: 200,
};

Dashboard.propTypes = {
	getProjects: PropTypes.func,
	isRequestingProjects: PropTypes.bool,
	projectsData: PropTypes.array,
	projectsDataStatusCode: PropTypes.number,
};

const mapStateToProps = reduxState => {
	return {
		isRequestingProjects: reduxState.projects.isRequestingProjects,
		projectsData: reduxState.projects.data,
		projectsDataStatusCode: reduxState.projects.statusCode,
	};
};

export default connect(
	mapStateToProps,
	{
		getProjects,
	},
)(Dashboard);
