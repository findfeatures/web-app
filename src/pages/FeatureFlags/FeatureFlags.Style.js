import styled from "styled-components";

export const StyledTitle = styled.h1`
	font-size: 30px;
	position: absolute;
	top: 20px;
`;

export const StyledButtonWrapper = styled.div`
	position: absolute;
	top: 40px;
	right: 40px;

	width: 220px;
	height: 50px;
`;

export const StyledListDivWrapper = styled.div`
	height: 85%;
	width: 98%;
	margin-top: 80px;
	position: relative;

	:after {
		content: "";
		position: absolute;
		z-index: 1;
		bottom: 0;
		left: 0;
		pointer-events: none;
		background-image: linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0),
			rgba(255, 255, 255, 1) 90%
		);
		width: 100%;
		height: 10%;
	}
`;

export const StyledListDiv = styled.div`
	height: 100%;
	width: 100%;
	overflow: auto;
`;

export const StyledList = styled.ul`
	list-style-type: none;
	padding: 0px;
`;

export const StyledListItemDiv = styled.div`
	height: 100px;
	margin: 15px;
	${props => (props.lastItem ? "margin-bottom: 50px" : "")};
	padding: 0px;
	cursor: pointer;

	box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.19);
	-webkit-box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.19);
	-moz-box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.19);

	position: relative;
`;

export const StyledListItemTitle = styled.h1`
	position: absolute;
	top: 10px;
	left: 15px;
	padding: 0px;
	margin: 0px;

	font-size: 18px;
`;

export const StatusDivWrapper = styled.div`
	position: absolute;
	top: 10px;
	right: 12px;
	display: flex;
	flex-direction: row;
	height: 35px;

	> p {
		padding-right: 5px;
		margin: 0px;
		line-height: 35px;
	}
`;

export const StatusDiv = styled.div`
	border-radius: 7px;
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.19);
	-webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.19);
	-moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.19);

	width: 50px;

	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	color: black;

	background-color: ${props => props.backgroundColor};

	font-weight: 800;
	font-size: 14px;
`;
