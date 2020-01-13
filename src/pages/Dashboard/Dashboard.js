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
	ContentWrapper,
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

	getSelectedProjectID = () => {
		let selectedProjectID = null;

		if (this.props["*"] === "projects/create") {
			selectedProjectID = 0;
		}

		return selectedProjectID;
	};

	showFourOFour = () => {
		// not the happiest with this code but it's something that works and has the functionality
		// we want (show 404 on routes not defined..)
		const route = this.props["*"];

		const invalidToken = !this.state.hasValidToken;

		// generate dynamic routes allowed
		const complexRoutes = [":project_id/home"];

		const projectIDs = this.props.projects.map(project => project.id);
		const validGeneratedRoutes = complexRoutes
			.map(complexRoute => {
				return projectIDs.map(projectID =>
					complexRoute.replace(":project_id", projectID),
				);
			})
			.flat();

		// check children routes
		const simpleRoutes = ["", "projects/create"];
		const invalidChildrenRoute = ![
			...simpleRoutes,
			...validGeneratedRoutes,
		].includes(route);

		return invalidToken || invalidChildrenRoute;
	};

	render() {
		if (this.showFourOFour() && !this.loadingInitialData()) {
			return <FourOFour />;
		}

		const selectedProjectID = this.getSelectedProjectID();

		return (
			<DashboardPageDiv>
				<NavBarDiv>
					<NavBar />
				</NavBarDiv>
				<PageDiv>
					<SideBarWrapper>
						<SideBar
							projects={this.props.projects}
							selectedProjectID={selectedProjectID}
						/>
					</SideBarWrapper>
					<ContentWrapper>{this.props.children}</ContentWrapper>
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
	getProjects: () => {},
	projects: [],
	isRequestingProjects: false,
	projectRequestStatusCode: 200,
};

Dashboard.propTypes = {
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
