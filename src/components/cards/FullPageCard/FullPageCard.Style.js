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

	position: relative;
`;

export const Card = styled.div`
	background-color: white;

	width: 100%;
	height: 100%;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;
