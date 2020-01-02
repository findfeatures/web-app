import styled from "styled-components";

export const StyledButton = styled.button`
	background-color: black;
	color: white;
	width: 100%;
	height: 100%;
	cursor: pointer;
	font-size: 25px;
	font-weight: 800;
	letter-spacing: 2px;
	outline: none;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	:active {
		background-color: ${props => (props.disabled ? "black" : "#0055fe")};
		color: white;
	}
`;
