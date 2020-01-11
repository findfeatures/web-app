import jwt from "jsonwebtoken";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import InitialDataLoadOverlay from "../../components/modals/InitialDataLoadOverlay";
import NavBar from "../../components/navigation/NavBar";
import SideBar from "../../components/navigation/SideBar";
import { getProjects } from "../../redux/actions/projects";
import FourOFour from "../FourOFour";
import {
	DashboardPageDiv,
	NavBarDiv,
	PageDiv,
	SideBarWrapper,
} from "./Dashboard.Style.js";

class Dashboard extends React.Component {
	state = {
		hasValidToken: false,
		finishedRequestingProjectData: false,
		projectDataError: false,
	};

	constructor(props) {
		super(props);
		// todo: make this a function so 404 can use it too!
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
		if (this.state.hasValidToken) {
			this.props.getProjects();
		}
	}

	componentDidUpdate(prevProps) {
		const finishedRequestingProjects =
			this.props.isRequestingProjects !== prevProps.isRequestingProjects &&
			prevProps.isRequestingProjects;

		if (finishedRequestingProjects) {
			// todo: handle finished here! and status codes!!

			if (this.props.projectRequestStatusCode === 200) {
				this.setState({
					finishedRequestingProjectData: true,
				});
			} else {
				this.setState({
					finishedRequestingProjectData: true,
					projectDataError: true,
				});
			}
		}
	}

	loadingInitialData = () => {
		return !this.state.finishedRequestingProjectData;
	};

	loadingInitialDataError = () => {
		return this.state.projectDataError;
	};

	render() {
		// not the happiest with this code but it's something that works and has the functionality
		// we want (show 404 on routes not defined..)
		const showFourOFour =
			!this.state.hasValidToken ||
			!this.props.childrenRoutes.includes(this.props["*"]);

		if (showFourOFour) {
			return <FourOFour />;
		}

		return (
			<DashboardPageDiv>
				<NavBarDiv>
					<NavBar />
				</NavBarDiv>
				<PageDiv>
					<SideBarWrapper>
						<SideBar projects={this.props.projects} />
					</SideBarWrapper>
					{this.props.children}
				</PageDiv>
				<InitialDataLoadOverlay
					show={this.loadingInitialData()}
					error={this.loadingInitialDataError()}
				/>
			</DashboardPageDiv>
		);
	}
}

Dashboard.defaultProps = {
	childrenRoutes: [],
	getProjects: () => {},
	projects: [],
	isRequestingProjects: false,
	projectRequestStatusCode: 200,
};

Dashboard.propTypes = {
	childrenRoutes: PropTypes.array.isRequired,
	getProjects: PropTypes.func.isRequired,
	projects: PropTypes.array.isRequired,
	isRequestingProjects: PropTypes.bool.isRequired,
	projectRequestStatusCode: PropTypes.number.isRequired,
};

const mapStateToProps = reduxState => {
	return {
		projects: reduxState.projects.data,
		isRequestingProjects: reduxState.projects.isRequestingProjects,
		projectRequestStatusCode: reduxState.projects.statusCode,
	};
};

export default connect(
	mapStateToProps,
	{
		getProjects,
	},
)(Dashboard);
