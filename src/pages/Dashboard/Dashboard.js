import jwt from "jsonwebtoken";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import NavBar from "../../components/navigation/NavBar";
import SideBar from "../../components/navigation/SideBar";
import FourOFour from "../FourOFour";
import {
	DashboardPageDiv,
	NavBarDiv,
	PageDiv,
	SideBarWrapper,
} from "./Dashboard.Style.js";

class Dashboard extends React.PureComponent {
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
						<SideBar />
					</SideBarWrapper>
					{this.props.children}
				</PageDiv>
			</DashboardPageDiv>
		);
	}
}

Dashboard.defaultProps = {
	childrenRoutes: [],
};

Dashboard.propTypes = {
	childrenRoutes: PropTypes.array.isRequired,
};

const mapStateToProps = reduxState => {
	return {};
};

export default connect(
	mapStateToProps,
	{},
)(Dashboard);
