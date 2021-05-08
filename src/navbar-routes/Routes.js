import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import BoogieBotApi from "../Api";
import Events from "../Events";
import Home from "../Home";
import MyEvent from "../MyEvent";
import Inspiration from "../Inspiration";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";
import EditProfileForm from "../forms/EditProfileForm";

/** Main Routes, some are protected and only accessible to logged in users. 
 * If user is not logged in, page redirects to homepage and asks to log in or sign up.
*/

const Routes = ({ login, signup, currentUser }) => {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ events, setEvents ] = useState([]);

	useEffect(() => {
		getEvents();
	}, []);

	async function getEvents (title) {
		let events = await BoogieBotApi.getEvents(title);
		setEvents(events);
		setIsLoading(false);
	}
	if (isLoading) {
		return <p>Loading &hellip;</p>;
	}

	return (
		<Switch>
			<Route exact path="/">
				<Home currentUser={currentUser} />
			</Route>
			{currentUser && (
				<Route exact path="/events">
					<Events events={events} getEvents={getEvents} />
				</Route>
			)}
			{currentUser && (
				<Route path="/events/:id">
					<MyEvent events={events} cantFind="/events" />
				</Route>
			)}
			<Route path="/inspiration">
				<Inspiration />
			</Route>
			{/* {currentUser && (
				<Route path="/catering">
					<SearchCard currentUser={currentUser} />
				</Route>
			)} */}

			<Route path="/login">
				<LoginForm login={login} />
			</Route>
			<Route path="/signup">
				<SignupForm signup={signup} />
			</Route>
			{currentUser && (
				<Route path="/profile">
					<EditProfileForm currentUser={currentUser} />
				</Route>
			)}
			<Redirect to="/" />
		</Switch>
	);
};

export default Routes;
