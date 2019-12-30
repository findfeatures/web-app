import styled from "styled-components";

export const LoginPageDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

export const RightButtonWrapper = styled.div`
	position: absolute;
	bottom: 0;
	right: 0;
	height: 65px;
	width: 180px;
`;

export const LogoWrapper = styled.div`
	cursor: pointer;
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

	height: 65%;

	margin-top: 8%;

	position: relative;
`;

export const StyledLabel = styled.label`
	display: flex;
	align-items: center;
	flex-direction: row;
	cursor: pointer;
`;

export const ExtraDetailsDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	margin-top: 30px;
	width: 90%;

	margin: 0 auto 0 auto;
	margin-top: 30px;
`;

export const StyledSpan = styled.span`
	margin-left: 10px;
	font-weight: 600;
`;

export const StyledSignUpDiv = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	margin: 0 0 15px 25px;
	font-weight: 500;
	cursor: pointer;
`;
