import styled from "styled-components";

export const CardWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

export const Card = styled.div`
	background-color: white;

	width: 95%;
	height: 95%;

	box-shadow: 0px 0px 67px 0px rgba(0, 0, 0, 0.19);
	-webkit-box-shadow: 0px 0px 67px 0px rgba(0, 0, 0, 0.19);
	-moz-box-shadow: 0px 0px 67px 0px rgba(0, 0, 0, 0.19);

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	position: relative;

	border: ${props => (props.showBorder ? "5px solid black" : "")};
`;

export const StyledTitle = styled.h2`
	position: absolute;
	top: 20px;
`;
export const StyledSubTitle = styled.p`
	position: absolute;
	top: 60px;
	font-style: italic;
	font-weight: 300;
`;

export const StyledList = styled.ul`
	width: 90%;
	height: 55%;
	padding: 0px;
	margin-top: 35px;
`;

export const StyledListItem = styled.li`
	width: 100%;
	height: 40px;
	list-style-type: none;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	position: relative;
`;

export const ButtonWrapper = styled.div`
	position: absolute;
	bottom: 35px;
	width: 80%;
	height: 65px;
`;

export const StyledFooter = styled.p`
	position: absolute;
	bottom: -10px;
`;
