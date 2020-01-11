import jwt from "jsonwebtoken";

import { auth_user_api } from "../../src/api.js";

context("Login", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/");
	});

	it("/ should redirect to login", () => {
		// todo: see if cypress can run before each except for this one!
		cy.location("pathname").should("include", "login");
	});

	it("should show correct copy", () => {
		cy.contains("Find Features");
		cy.contains("Designed & Developed by Calum Webb");
		cy.contains("Remember me");
		cy.contains("Forgot your password?");
		cy.contains("LOG IN");
		cy.contains("Need an account? Sign up here!");
	});

	it("should be able to navigate to sign up page if clicking copy", () => {
		cy.contains("Need an account? Sign up here!").click();
		cy.location("pathname").should("include", "sign-up");
	});

	it("should be able to toggle remember me button", () => {
		// this button doesn't currently do anything but in the future it will!
		cy.get("[data-test-id=checkbox-svg]").should("not.be.visible");
		cy.contains("Remember me").click();
		cy.get("[data-test-id=checkbox-svg]").should("be.visible");
		cy.contains("Remember me").click();
		cy.get("[data-test-id=checkbox-svg]").should("not.be.visible");
	});

	it("should not allow user to log in unless email and password present", () => {
		cy.server();

		cy.route({
			method: auth_user_api.method,
		    url: auth_user_api.path,
		    onResponse: () => {
		       expect("Unexpected Https call").to.be.false;
		    }
		});

		cy.contains("LOG IN").click();

		cy.contains("Password is required.");
		cy.contains("Email is required.");

		cy.location("pathname").should("include", "login");
	});

	const makeLoginRequest = ({useEnterKey}) => {
		cy.get("[data-test-id=input-text-Email]")
			.type("demo@user.com")
			.should("have.value", "demo@user.com");

		cy.get("[data-test-id=input-password-Password]")
			.type("password")
			.should("have.value", "password");

		cy.server();

		const jwtToken = jwt.sign({}, "secret", { expiresIn: 60 * 60 });

		cy.route({
			method: auth_user_api.method,
			url: auth_user_api.path,
			response: {
				JWT: jwtToken,
			},
			delay: 2000,
			onRequest: ({ request }) => {
				const { body } = request;
				const { email, password } = body;
				expect(email).to.equal("demo@user.com");
				expect(password).to.equal("password");
			},
			onResponse: () => {
				expect(sessionStorage.getItem('JWT_TOKEN')).to.equal(jwtToken);
			}
		}).as('authRequestRoute');

		cy.get("[data-test-id=spinner]").should("not.exist");

		if (useEnterKey) {
			cy.get('body').trigger('keydown', { keyCode: 13, which: 13 });
		} else {
			cy.contains("LOG IN")
				.click()
				.should("be.disabled");
		}

		cy.get("[data-test-id=spinner]").should("be.visible");

		cy.wait('@authRequestRoute');

		cy.location("pathname").should("include", "dashboard");


	};

	it("should be able to log user in", () => {
		makeLoginRequest({useEnterKey: false});
	});

	it("should allow the user to log in using the Enter key", () => {
		makeLoginRequest({useEnterKey: true});
	});

	const makeErrorLoginRequest = ({status, errorMessage, skipCorrectError = false}) => {
		cy.get("[data-test-id=input-text-Email]")
				.type("demo@user.com")
				.should("have.value", "demo@user.com");

		cy.get("[data-test-id=input-password-Password]")
			.type("password")
			.should("have.value", "password");

		cy.server();

		cy.route({
			method: auth_user_api.method,
			url: auth_user_api.path,
			response: {},
			delay: 1000,
			status: status,
		}).as('authRequestRoute');

		cy.contains("LOG IN").click().should("be.disabled");

		// after incorrect, if password is edited then message should disappear
		cy.get("[data-test-id=spinner]").should("be.visible");

		cy.wait('@authRequestRoute');

		cy.contains(errorMessage);

		if (!skipCorrectError) {
			cy.get("[data-test-id=input-password-Password]").type("{backspace}");
			cy.get("[data-test-id=input-error-password-Password]").should('not.exist');
		}
	};

	it("should show error if email or password wrong", () => {
		makeErrorLoginRequest({status: 401, errorMessage: "Incorrect Email / Password combination!"});
	});

	it("should show error if server sends weird status code", () => {
		makeErrorLoginRequest({status: 300, errorMessage: "Incorrect Email / Password combination!"});
	});

	it("should show error if server can't connect", () => {
		makeErrorLoginRequest({status: 503, errorMessage: "Can't connect to server! Please retry."});
	});

	it("should show error if server has internal error", () => {
		makeErrorLoginRequest({status: 500, errorMessage: "Internal Server Error! Please retry."});
	});

	it("should show verify email pop up if email not verified", () => {
		cy.get('[data-test-id=modal-login-verification]').should("not.exist");
		makeErrorLoginRequest({status: 418, errorMessage: "Please verify your email first.", skipCorrectError: true});

		cy.get('[data-test-id=modal-login-verification]').should("be.visible");

		cy.contains('Important!');
		cy.contains('You need to verify your account first before logging in.');
		cy.contains("RESEND EMAIL");
	});
});
