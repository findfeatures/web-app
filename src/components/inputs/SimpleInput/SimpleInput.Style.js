import styled from "styled-components";

export const MainDiv = styled.div`
	width: 100%;
	height: 100%;
	font-weight: 700;
	position: relative;
	display: flex;
	flex-direction: column;
`;

export const InputDiv = styled.div`
	width: 100%;
	height: 35px;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
`;

export const StyledInput = styled.input`
	width: 100%;
	height: 100%;
	margin: 0 auto;
	font-weight: 900;
	font-size: 18px;
	outline: 0;
	padding-bottom: 5px;
	border-top: 0px;
	border-left: 0px;
	border-right: 0px;
	border-bottom: 3px solid black;
`;

export const ErrorDiv = styled.div`
	width: 100%;

	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;

	position: absolute;
	bottom: -25px;

	color: red;
	user-select: none;
	font-weight: 800;
`;
