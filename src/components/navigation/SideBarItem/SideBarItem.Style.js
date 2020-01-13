import { Tooltip } from "react-tippy";
import styled from "styled-components";

export const ItemDiv = styled.div`
	width: 100%;
	height: 56px;
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

	box-shadow: 0px 0px 67px 0px rgba(0, 0, 0, 0.2);
	-webkit-box-shadow: 0px 0px 67px 0px rgba(0, 0, 0, 0.2);
	-moz-box-shadow: 0px 0px 67px 0px rgba(0, 0, 0, 0.2);

	border: ${props => (props.selected ? "0.5px solid black" : "")};

	:hover {
		border: 2px solid black;
		font-weight: 600;
	}
	font-size: ${props => props.fontSize};
`;

export const StyledTooltip = styled(Tooltip)`
	width: 100%;
	height: 100%;
`;

export const TooltipContent = styled.div`
	padding: 5px;
	font-weight: 700;
`;
