import React from "react";
import { Tooltip } from "react-tippy";

import { ReactComponent as InfoSVG } from "../../../../assets/svgs/info.svg";
import BlockButton from "../../../buttons/BlockButton";
import Spinner from "../../../miscellaneous/Spinner";
import {
	ButtonWrapper,
	Card,
	CardWrapper,
	StyledFooter,
	StyledList,
	StyledListItem,
	StyledSubTitle,
	StyledTitle,
} from "./BaseBillingCard.Style.js";

const BaseBillingCard = ({
	id,
	title,
	price,
	onClickHandler,
	showBorder = false,
	footerText,
	purchaseText,
	features = [],
	showSpinner,
}) => {
	return (
		<CardWrapper>
			<Card showBorder={showBorder}>
				<StyledTitle>{title}</StyledTitle>
				<StyledSubTitle>{price}</StyledSubTitle>
				<StyledList>
					{features.map((feature, index) => {
						// we can supply an array instead of a string, if so then show a
						// lil information pop up
						if (typeof feature === "object") {
							return (
								<StyledListItem key={`${title}-${id}-${index}`}>
									{feature[0]}
									<Tooltip
										html={<div style={{ margin: "7px" }}>{feature[1]}</div>}
										theme="light"
										animation="perspective"
										arrow="true"
									>
										<InfoSVG
											width={16}
											height={"100%"}
											style={{ marginLeft: "5px" }}
										/>
									</Tooltip>
								</StyledListItem>
							);
						} else {
							return (
								<StyledListItem key={`${title}-${id}-${index}`}>
									{feature}
								</StyledListItem>
							);
						}
					})}
				</StyledList>
				<ButtonWrapper>
					<BlockButton onClickHandler={() => onClickHandler(id)}>
						{showSpinner ? <Spinner /> : purchaseText}
					</BlockButton>
				</ButtonWrapper>
				<StyledFooter>{footerText}</StyledFooter>}
			</Card>
		</CardWrapper>
	);
};

export default BaseBillingCard;
