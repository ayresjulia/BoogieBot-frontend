import React from "react";
import { render } from "@testing-library/react";
import Catering from "./Catering";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";

const currentUser = { username: "testuser", isAdmin: false };

const testEvents = [
	{
		id: 1,
		title: "Anniversary",
		description: "Anniversary",
		eventDate: "2021-05-19",
		eventTime: "13:00",
		city: "Minsk",
		state: "CA",
		country: "Belarus",
		imgUrl:
			"https://images.unsplash.com/photo-1532117182044-031e7cd916ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		hostUsername: "testuser"
	},
	{
		id: 2,
		title: "Wedding",
		description: "Wedding",
		eventDate: "2021-05-19",
		eventTime: "13:00",
		city: "Minsk",
		state: "CA",
		country: "Belarus",
		imgUrl:
			"https://images.unsplash.com/photo-1532117182044-031e7cd916ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		hostUsername: "testuser"
	}
];

it("renders without crashing", async () => {
	act(() => {
		render(
			<MemoryRouter>
				<Catering events={testEvents} currentUser={currentUser} />
			</MemoryRouter>
		);
	});
});

it("shows text on the page", async () => {
	act(() => {
		const { getByText } = render(
			<MemoryRouter>
				<Catering events={testEvents} currentUser={currentUser} />
			</MemoryRouter>
		);
		expect(getByText("lookup")).toBeInTheDocument();
	});
});
