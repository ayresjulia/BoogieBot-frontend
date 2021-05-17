import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import BoogieBotApi from "../Api";
import Events from "../Events";
import EventForm from "../forms/EventForm";
import Home from "../Home";
import MyEvent from "../MyEvent";
import Inspiration from "../Inspiration";
import Catering from "../Catering";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";
import EditProfileForm from "../forms/EditProfileForm";
import dict from "../helpers/dictionary";
import EditEventForm from "../forms/EditEventForm";
/** Main Routes, some are protected and only accessible to logged in users. 
 * If user is not logged in, page redirects to homepage and asks to log in or sign up.
*/

const Routes = ({ login, signup, currentUser, newEvent, saveToMoodboard }) => {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ events, setEvents ] = useState([]);

	useEffect(() => {
		getEvents();
	}, []);

	async function getEvents () {
		let events = await BoogieBotApi.getEvents();
		setEvents(events);
		setIsLoading(false);
	}

	if (isLoading) {
		return <p>{dict.loading}</p>;
	}

	return (
		<Switch>
			<Route exact path="/login">
				<LoginForm login={login} />
			</Route>
			<Route exact path="/signup">
				<SignupForm signup={signup} />
			</Route>
			{currentUser && (
				<Route exact path="/events/new">
					<EventForm newEvent={newEvent} currentUser={currentUser} />
				</Route>
			)}
			{currentUser && (
				<Route exact path="/events/:id/edit">
					<EditEventForm events={events} currentUser={currentUser} />
				</Route>
			)}
			{currentUser && (
				<Route exact path="/events/:id">
					<MyEvent events={events} cantFind="/events" />
				</Route>
			)}

			{currentUser && (
				<Route exact path="/events">
					<Events events={events} currentUser={currentUser} />
				</Route>
			)}
			{currentUser && (
				<Route exact path="/inspiration">
					<Inspiration
						events={events}
						currentUser={currentUser}
						saveToMoodboard={saveToMoodboard}
					/>
				</Route>
			)}
			{currentUser && (
				<Route exact path="/catering">
					<Catering
						events={events}
						currentUser={currentUser}
						saveToMoodboard={saveToMoodboard}
					/>
				</Route>
			)}
			{currentUser && (
				<Route exact path="/profile">
					<EditProfileForm currentUser={currentUser} />
				</Route>
			)}
			{currentUser && (
				<Route exact path="/">
					<Home currentUser={currentUser} />
				</Route>
			)}
			<Redirect to="/" />
		</Switch>
	);
};

export default Routes;
