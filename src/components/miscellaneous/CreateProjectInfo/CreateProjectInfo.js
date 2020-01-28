import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { injectStripe } from "react-stripe-elements";

import { getStripeCheckoutSession } from "../../../redux/actions/stripe";
import BusinessBillingCard from "../../cards/billingCards/BusinessBillingCard";
import EnterpriseBillingCard from "../../cards/billingCards/EnterpriseBillingCard";
import StartupBillingCard from "../../cards/billingCards/StartupBillingCard";
import SimpleInput from "../../inputs/SimpleInput";
import {
	BillingSelectionDiv,
	BillingWrapper,
	InputWrapper,
	LeftWrapper,
	NameCreationDiv,
	ProjectSelectButtonContent,
	ProjectSelectedButtonWrapper,
	ProjectSelectedWrapper,
	QuestionTitleDiv,
	RightWrapper,
	Wrapper,
} from "./CreateProjectInfo.Style.js";

const CreateProjectInfo = ({ billingId, stripe }) => {
	const dispatch = useDispatch();

	const [billId, setBillingId] = useState(billingId);
	const [projectName, setProjectName] = useState("");

	const [projectNameError, setProjectNameError] = useState({
		error: false,
		message: "",
	});

	const isRequestingStripeCheckoutSession = useSelector(
		state => state.stripe.isRequestingStripeCheckoutSession,
	);
	const stripeSessionId = useSelector(state => state.stripe.data);

	useEffect(() => {
		if (!isRequestingStripeCheckoutSession && stripeSessionId !== "") {
			// todo: check what happens statusCode comes back BAD!
			stripe.redirectToCheckout({
				sessionId: stripeSessionId,
			});
		}
	}, [isRequestingStripeCheckoutSession, stripeSessionId]);

	const createProject = id => {
		if (projectName.replace(/\s/g, "") === "") {
			setProjectNameError({
				error: true,
				message: "Project Name is required",
			});
		} else {
			setProjectNameError({
				error: false,
				message: "",
			});
			dispatch(
				getStripeCheckoutSession({
					plan: id,
					successUrl: "http://localhost:3000/dashboard/projects/create/success",
					cancelUrl: "http://localhost:3000/error",
					projectData: {
						name: projectName,
					},
				}),
			);
		}
	};

	const renderBillingCard = () => {
		switch (billId) {
			case "plan_Ga0Xrskb4VQpwq":
				return (
					<StartupBillingCard
						showBorder={true}
						purchaseText={"Create Now"}
						footerText={"You'll be redirected to Stripe for payment."}
						onClickHandler={createProject}
						showSpinner={isRequestingStripeCheckoutSession}
					/>
				);
			case "plan_Ga0YFeoBspguoC":
				return (
					<BusinessBillingCard
						showBorder={true}
						purchaseText={"Create Now"}
						footerText={"You'll be redirected to Stripe for payment."}
						onClickHandler={createProject}
						showSpinner={isRequestingStripeCheckoutSession}
					/>
				);
			case "plan_Ga0YNRfEEaNcGI":
				return (
					<EnterpriseBillingCard
						showBorder={true}
						purchaseText={"Create Now"}
						footerText={"You'll be redirected to Stripe for payment."}
						onClickHandler={createProject}
						showSpinner={isRequestingStripeCheckoutSession}
					/>
				);
		}
	};

	const setBillingIdHandler = id => {
		if (!isRequestingStripeCheckoutSession) {
			setBillingId(id);
		}
	};

	return (
		<Wrapper>
			<LeftWrapper>
				<BillingSelectionDiv>
					<QuestionTitleDiv>
						<b>Select your plan type</b>
					</QuestionTitleDiv>
					<ProjectSelectedWrapper>
						<ProjectSelectedButtonWrapper>
							<ProjectSelectButtonContent
								selected={billId === "plan_Ga0Xrskb4VQpwq"}
								onClick={() => setBillingIdHandler("plan_Ga0Xrskb4VQpwq")}
							>
								Startup 🚀
							</ProjectSelectButtonContent>
						</ProjectSelectedButtonWrapper>
						<ProjectSelectedButtonWrapper>
							<ProjectSelectButtonContent
								selected={billId === "plan_Ga0YFeoBspguoC"}
								onClick={() => setBillingIdHandler("plan_Ga0YFeoBspguoC")}
							>
								Business 💼
							</ProjectSelectButtonContent>
						</ProjectSelectedButtonWrapper>
						<ProjectSelectedButtonWrapper right={true}>
							<ProjectSelectButtonContent
								selected={billId === "plan_Ga0YNRfEEaNcGI"}
								onClick={() => setBillingIdHandler("plan_Ga0YNRfEEaNcGI")}
							>
								Enterprise 🏢
							</ProjectSelectButtonContent>
						</ProjectSelectedButtonWrapper>
					</ProjectSelectedWrapper>
				</BillingSelectionDiv>
				<NameCreationDiv>
					<QuestionTitleDiv>
						<b>Name your project</b>️
					</QuestionTitleDiv>
					<InputWrapper>
						<SimpleInput
							inputValue={projectName}
							handleInputValueChange={setProjectName}
							errorMessage={projectNameError.message}
							showError={projectNameError.error}
							disabled={isRequestingStripeCheckoutSession}
						/>
					</InputWrapper>
				</NameCreationDiv>
			</LeftWrapper>
			<RightWrapper>
				<BillingWrapper>{renderBillingCard()}</BillingWrapper>
			</RightWrapper>
		</Wrapper>
	);
};

export default injectStripe(CreateProjectInfo);
