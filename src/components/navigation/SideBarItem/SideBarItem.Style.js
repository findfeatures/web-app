import { Tooltip } from "react-tippy";
import styled from "styled-components";

export const ItemDiv = styled.div`
	width: 100%;
	height: 65px;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	padding: 5px;
	cursor: pointer;
`;

export const ContentDiv = styled.div`
	width: 100%;
	height: 100%;

	user-select: none;

	box-sizing: border-box;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;

	border: ${props => (props.selected ? "0.5px solid black" : "")};

	:hover {
		border: 2px solid black;
		font-weight: 600;
	}

	:active {
		color: #0055fe;
		border: 2px solid #0055fe;
	}
	font-size: ${props => props.fontSize};
`;

export const StyledTooltip = styled(Tooltip)`
	width: 100%;
	height: 100%;
`;
