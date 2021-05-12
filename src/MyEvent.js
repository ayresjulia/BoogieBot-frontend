import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./MyEvent.css";
import dict from "./helpers/dictionary";

const SearchEvent = ({ events, cantFind }) => {
	const { id } = useParams();

	let event = events.find((event) => parseInt(event.id) === parseInt(id));
	if (!event) return <Redirect to={cantFind} />;

	return (
		<section>
			<Card className="Event">
				<CardBody>
					<CardTitle className="font-weight-bold text-center">{event.title}</CardTitle>

					<p>
						<b>{dict.myEventDesc}</b> {event.description}
					</p>
					<p>
						<b>{dict.myEventWhen}</b> {event.eventDate}
					</p>
					<p>
						<b>{dict.myEventTime}</b> {event.eventTime}
					</p>
					<p>
						<b>{dict.myEventLocation}</b> {event.city} | {event.state} | {event.country}
					</p>
				</CardBody>
			</Card>
		</section>
	);
};

export default SearchEvent;
