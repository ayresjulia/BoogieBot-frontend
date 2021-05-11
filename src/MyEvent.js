import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./MyEvent.css";

/** Single job card. */

const SearchJob = ({ events, cantFind }) => {
	const { id } = useParams();

	let event = events.find((event) => parseInt(event.id) === parseInt(id));
	if (!event) return <Redirect to={cantFind} />;

	return (
		<section>
			<Card className="Event">
				<CardBody>
					<CardTitle className="font-weight-bold text-center">{event.title}</CardTitle>

					<p>
						<b>Description:</b> {event.description}
					</p>
					<p>
						<b>When:</b> {event.eventDate}
					</p>
					<p>
						<b>Time:</b> {event.eventTime}
					</p>
					<p>
						<b>Location:</b> {event.city} | {event.state} | {event.country}
					</p>
				</CardBody>
			</Card>
		</section>
	);
};

export default SearchJob;
