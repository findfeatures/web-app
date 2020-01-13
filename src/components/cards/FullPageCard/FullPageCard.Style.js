import styled from "styled-components";

export const CardWrapper = styled.div`
	width: 100%;
	height: 100%;

	padding: ${props => props.padding};
	box-sizing: border-box;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

export const Card = styled.div`
	background-color: white;

	width: 100%;
	height: 100%;

	// box-shadow: 0px 0px 67px 0px rgba(0, 0, 0, 0.19);
	// -webkit-box-shadow: 0px 0px 67px 0px rgba(0, 0, 0, 0.19);
	// -moz-box-shadow: 0px 0px 67px 0px rgba(0, 0, 0, 0.19);

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;
