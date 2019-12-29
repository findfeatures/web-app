import styled from "styled-components";

export const SignUpPageDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

export const LeftButtonWrapper = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	height: 65px;
	width: 180px;
`;

export const RightButtonWrapper = styled.div`
	position: absolute;
	bottom: 0;
	right: 0;
	height: 65px;
	width: 180px;
`;

export const TitleWrapper = styled.div`
	position: absolute;
	top: 15px;
	height: 65px;
	width: 100%;
	line-height: 65px;
	text-align: center;
	font-weight: 900;
	font-size: 40px;
`;

export const SignUpDiv = styled.div`
	width: 65%;
	height: 70%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
`;

export const StyledTitle = styled.div`
	position: absolute;
	top: ${props => (props.top ? props.top : "55px")};
	width: 100%;
	text-align: center;
	font-weight: 700;
	font-size: 25px;
`;

export const StyledFooter = styled.div`
	position: absolute;
	bottom: ${props => (props.bottom ? props.bottom : "10px")}
	width: 100%;
	text-align: center;
	font-weight: 500;
	font-size: 15px;
`;

export const StyledSpan = styled.span`
	color: ${props => props.color};
	font-weight: 900;
`;
