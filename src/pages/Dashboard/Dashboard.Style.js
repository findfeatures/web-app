import styled from "styled-components";

export const DashboardPageDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-flow: column;
	position: relative;
`;

export const NavBarDiv = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	background-color: white;
	box-shadow: 0px 0px 67px 0px rgba(0, 0, 0, 0.19);
	-webkit-box-shadow: 0px 0px 67px 0px rgba(0, 0, 0, 0.19);
	-moz-box-shadow: 0px 0px 67px 0px rgba(0, 0, 0, 0.19);
`;

export const PageDiv = styled.div`
	flex: 2;
	position: relative;
	display: flex;
`;

export const SideBarWrapper = styled.div`
	height: 100%;
	width: 50px;
	box-shadow: 0px 0px 67px 0px rgba(0, 0, 0, 0.19);
`;

export const ContentWrapper = styled.div`
	height: 100%;
	width: 100%;
`;
