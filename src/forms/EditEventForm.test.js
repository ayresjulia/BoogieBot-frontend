// import { render } from "@testing-library/react";
// import React from "react";
// import EditEventForm from "./EditEventForm";
// import { MemoryRouter } from "react-router";

// // let testEvents = [
// // 	{
// // 		id: 1,
// // 		title: "Anniversary",
// // 		description: "Anniversary",
// // 		eventDate: "2021-05-19",
// // 		eventTime: "13:00",
// // 		city: "Minsk",
// // 		state: "CA",
// // 		country: "Belarus",
// // 		imgUrl:
// // 			"https://images.unsplash.com/photo-1532117182044-031e7cd916ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
// // 		hostUsername: "testuser"
// // 	},
// // 	{
// // 		id: 2,
// // 		title: "Wedding",
// // 		description: "Wedding",
// // 		eventDate: "2021-05-19",
// // 		eventTime: "13:00",
// // 		city: "Minsk",
// // 		state: "CA",
// // 		country: "Belarus",
// // 		imgUrl:
// // 			"https://images.unsplash.com/photo-1532117182044-031e7cd916ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
// // 		hostUsername: "testuser"
// // 	}
// // ];

// // beforeEach(() => {
// // 	testEvents;
// // });

// // afterEach(() => {
// // 	testEvents = [];
// // });

// it("renders without crashing", () => {
// 	let event = [
// 		{
// 			id: 1,
// 			title: "Anniversary",
// 			description: "Anniversary",
// 			eventDate: "2021-05-19",
// 			eventTime: "13:00",
// 			city: "Minsk",
// 			state: "CA",
// 			country: "Belarus",
// 			imgUrl:
// 				"https://images.unsplash.com/photo-1532117182044-031e7cd916ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
// 			hostUsername: "testuser"
// 		},
// 		{
// 			id: 2,
// 			title: "Wedding",
// 			description: "Wedding",
// 			eventDate: "2021-05-19",
// 			eventTime: "13:00",
// 			city: "Minsk",
// 			state: "CA",
// 			country: "Belarus",
// 			imgUrl:
// 				"https://images.unsplash.com/photo-1532117182044-031e7cd916ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
// 			hostUsername: "testuser"
// 		}
// 	];
// 	let id = 1;

// 	let userInfo = {
// 		username: "testuser",
// 		isAdmin: false
// 	};
// 	render(
// 		<MemoryRouter>
// 			<EditEventForm events={event} id={id} currentUser={userInfo} />
// 		</MemoryRouter>
// 	);
// });
