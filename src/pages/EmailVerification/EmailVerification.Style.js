import styled from "styled-components";

export const EmailVerificationPage = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

export const ButtonWrapper = styled.div`
	width: 400px;
	height: 75px;
	margin-top: 20px;
`;

export const StyledFooter = styled.div`
	margin-top: 20px;
	color: ${props => props.color};
	width: 100%;
	text-align: center;
	font-weight: 500;
	font-size: 15px;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

export const LogoWrapper = styled.div`
	font-size: 40px;
	font-weight: 900;
	top: 15px;
	position: absolute;
`;

export const StyledH3 = styled.h3`
	font-size: 30px;
`;
