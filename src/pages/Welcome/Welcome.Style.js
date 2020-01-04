import FadeIn from "react-fade-in";
import styled from "styled-components";

export const StyledFullPage = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
`;

export const StyledFadeIn = styled(FadeIn)`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
`;

export const StyledHeader = styled.div`
	font-size: 45px;
	font-weight: 900;
`;

export const StyledSubHeader = styled.div`
	font-size: 25px;
`;

export const StyledButtonsDiv = styled.div`
	margin: 20px;
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: center;
`;

export const StyledButtonDiv = styled.div`
	width: 280px;
	height: 65px;
	margin: 30px;
`;
