import styled from "styled-components";

export const Wrapper = styled.div`
	width: 95%;
	height: 80%;
	min-height: 400px;
	display: flex;
	margin-top: 65px;
`;

export const LeftWrapper = styled.div`
	width: 50%;
	height: 100%;
	border-right: 3px solid black;

	display: flex;
	flex-direction: column;
`;

export const RightWrapper = styled.div`
	width: 50%;
	height: 100%;

	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
`;

export const BillingWrapper = styled.div`
	width: 80%;
	height: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
`;

export const BillingSelectionDiv = styled.div`
	width: 100%;
	margin-bottom: 45px;
	margin-top: 20px;
`;
export const QuestionTitleDiv = styled.div`
	margin-bottom: 15px;

	> b {
		font-weight: 900;
	}
`;

export const InputWrapper = styled.div`
	width: 95%;
	height: 100%;
	background-color: red;
`;

export const ProjectSelectedWrapper = styled.div`
	width: 95%;
	height: 50px;
	background-color: red;

	display: flex;
	flex-direction: row;
`;

export const ProjectSelectedButtonWrapper = styled.div`
	width: 33.3%;
	border-left: 3px solid black;
	border-top: 3px solid black;
	border-right: ${props => (props.right ? "3px" : "1.5px")} solid black;
	border-bottom: 3px solid black;

	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
`;

export const ProjectSelectButtonContent = styled.div`
	width: 100%;
	height: 100%;
	cursor: pointer;
	background: ${props => (props.selected ? "black" : "white")};
	color: ${props => (props.selected ? "white" : "black")};

	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
`;

export const NameCreationDiv = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: 45px;
`;
