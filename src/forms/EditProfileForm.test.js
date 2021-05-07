import { render } from "@testing-library/react";
import React from "react";
import EditProfileForm from "./EditProfileForm";

test("it renders without crashing", () => {
	let username = "testuser";
	render(<EditProfileForm currentUser={username} />);
});

it("matches snapshot", () => {
	let username = "testuser";
	const { asFragment } = render(<EditProfileForm currentUser={username} />);
	expect(asFragment()).toMatchSnapshot();
});

it("renders a field in the form", () => {
	let username = "testuser";
	const { getByText } = render(<EditProfileForm currentUser={username} />);
	expect(getByText("Confirm password to make changes")).toBeInTheDocument();
});
