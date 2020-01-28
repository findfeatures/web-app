import styled from "styled-components";

export const ContentDiv = styled.div`
	height: 100%;
	width: 100%;
	position: relative;

	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
`;

export const LogoContainer = styled.div`
	height: 100%;
	position: absolute;
	left: 25px;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
`;

export const LogoDiv = styled.div`
	font-weight: 900;
	font-size: 20px;
	cursor: pointer;
	user-select: none;

	:active {
		color: #0055fe;
	}
`;

export const RightButtonsDiv = styled.div`
	// background: gold;
	right: 10px;
	height: 100%;
	position: absolute;
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: center;
`;

export const ProjectNameDiv = styled.div`
	font-size: 16px;
	font-weight: 800;
	user-select: none;
	cursor: pointer;
`;
