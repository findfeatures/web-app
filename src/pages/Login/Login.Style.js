import styled from "styled-components";

export const LoginPageDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

export const LoginCardDiv = styled.div`
	width: 85%;
	min-width: 500px;
	max-width: 800px;

	height: 65%;
	min-height: 500px;
	max-height: 550px;

	background-color: white;

	box-shadow: 0px 0px 67px 0px rgba(0, 0, 0, 0.19);
	-webkit-box-shadow: 0px 0px 67px 0px rgba(0, 0, 0, 0.19);
	-moz-box-shadow: 0px 0px 67px 0px rgba(0, 0, 0, 0.19);
	position: relative;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

export const ButtonWrapper = styled.div`
	position: absolute;
	bottom: 0;
	right: 0;
	height: 65px;
	width: 180px;
`;

export const LogoWrapper = styled.div`
	position: absolute;
	top: 15px;
	height: 65px;
	width: 100%;
	line-height: 65px;
	text-align: center;
	font-weight: 900;
	font-size: 40px;
`;

export const FormWrapper = styled.div`
	width: 65%;

	height: 60%;

	background-color: white;

	// box-shadow: 0px 0px 67px 0px rgba(0, 0, 0, 0.19);
	// -webkit-box-shadow: 0px 0px 67px 0px rgba(0, 0, 0, 0.19);
	// -moz-box-shadow: 0px 0px 67px 0px rgba(0, 0, 0, 0.19);
	position: relative;
`;
