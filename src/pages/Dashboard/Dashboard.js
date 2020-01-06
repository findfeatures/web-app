import jwt from "jsonwebtoken";
import React from "react";
import { connect } from "react-redux";

import NavBar from "../../components/NavBar";
import FourOFour from "../FourOFour";
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

	render() {
		// not the happiest with this code but it's something that works and has the functionality
		// we want (show 404 on routes not defined..)
		const showFourOFour = !this.state.hasValidToken || ![""].includes(this.props["*"]);

		if (showFourOFour) {
			return <FourOFour />;
		}

		return (
			<DashboardPageDiv>
				<NavBarDiv>
					<NavBar />
				</NavBarDiv>
				<ContentDiv>
					{this.props.children}
				</ContentDiv>
			</DashboardPageDiv>
		);
	}
}

Dashboard.defaultProps = {};

Dashboard.propTypes = {};

const mapStateToProps = reduxState => {
	return {};
};

export default connect(
	mapStateToProps,
	{},
)(Dashboard);
