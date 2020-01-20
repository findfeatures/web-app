import styled from "styled-components";

export const Content = styled.div`
	width: 250px;
	padding: 10px;
	user-select: none;
`;

export const Title = styled.div`
	font-weight: 800;
	font-size: 18px;
	cursor: pointer;

	:active {
		color: #0055fe;
	}
`;

export const StyledHr = styled.hr`
	color: black;
	background-color: black;
	height: 1;
`;
