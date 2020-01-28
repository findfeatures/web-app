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
		if (this.props["*"] === "projects/create") {
			return 0;
		}

		const urlSplit = this.props["*"].split("/");

		if (urlSplit.length > 0) {
			return parseInt(urlSplit[0]);
		}
	};

	getSelectedProjectName = projectID => {
		for (let i = 0; i < this.props.projects.length; i++) {
			const project = this.props.projects[i];

			if (project.id === projectID) {
				return project.name;
			}
		}
		return "";
	};

	showFourOFour = () => {
		// not the happiest with this code but it's something that works and has the functionality
		// we want (show 404 on routes not defined..)
		const route = this.props["*"];

		// generate dynamic routes allowed
		const complexRoutes = [
			":project_id/home",
			":project_id/feature-flags",
			":project_id/audit-trail",
		];

		const projectIDs = this.props.projects.map(project => project.id);
		const validGeneratedRoutes = complexRoutes
			.map(complexRoute => {
				return projectIDs.map(projectID =>
					complexRoute.replace(":project_id", projectID),
				);
			})
			.flat();

		// check children routes
		const simpleRoutes = ["", "projects/create", "projects/create/success"];
		const invalidChildrenRoute = ![
			...simpleRoutes,
			...validGeneratedRoutes,
		].includes(route);

		return invalidChildrenRoute;
	};

	render() {
		// need to check token, otherwise if its not there then we just hang because no data is requested.
		if (
			!this.state.hasValidToken ||
			(this.showFourOFour() && !this.loadingInitialData())
		) {
			return <FourOFour />;
		}

		const selectedProjectID = this.getSelectedProjectID();
		const selectedProjectName = this.getSelectedProjectName(selectedProjectID);

		return (
			<DashboardPageDiv>
				<NavBarDiv>
					<NavBar
						projectName={selectedProjectName}
						projectID={selectedProjectID}
					/>
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
		projects: reduxState.projects.projectsData,
		isRequestingProjects: reduxState.projects.isRequestingProjects,
		projectRequestStatusCode: reduxState.projects.projectsStatusCode,
	};
};

export default connect(
	mapStateToProps,
	{
		getProjects,
	},
)(Dashboard);
