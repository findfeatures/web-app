import styled from "styled-components";

export const MainDiv = styled.div`
	width: 100%;
	height: 30%;
	font-weight: 700;
	position: relative;
`;

export const TitleDiv = styled.div`
	position: absolute;
	top: 25px;
	left: 25px;
	font-weight: 900;
`;

export const InputDiv = styled.div`
	width: 100%;
	height: 35px;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	bottom: 10px;
	position: absolute;
`;

export const StyledInput = styled.input`
	width: 90%;
	height: 100%;
	margin: 0 auto;
	font-weight: 900;
	font-size: 18px;
	outline: 0;
	padding-bottom: 5px;
	border-width: 0 0 3px;
	border-color: black;
`;

export const ErrorDiv = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	bottom: 0;
	margin-bottom: -18px;
	position: absolute;
	// background-color: red;
	position: absolute;
	color: red;
	user-select: none;
	font-weight: 800;
`;
