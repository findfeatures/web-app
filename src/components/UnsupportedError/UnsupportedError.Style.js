import styled from "styled-components";

export const FullScreenCenteredDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	z-index: 999;
	position: absolute;
	top: 0;
	bottom: 0;
`;

export const Wrapper = styled.div`
	width: 80%;
	background: white;
	padding: 50px;

	box-shadow: 0px 0px 67px 0px rgba(0, 0, 0, 0.19);
	-webkit-box-shadow: 0px 0px 67px 0px rgba(0, 0, 0, 0.19);
	-moz-box-shadow: 0px 0px 67px 0px rgba(0, 0, 0, 0.19);
`;

export const LogoDiv = styled.div`
	font-weight: 900;
	font-family
	font-size: 20px;
	margin-bottom: 5px;
`;
