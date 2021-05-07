import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, ListGroup, ListGroupItem, CardTitle } from "reactstrap";
import SearchForm from "./forms/SearchForm";
import "./Events.css";
/* Main search changes according to data type. */

const Events = ({ events, getEvents }) => {
	return (
		<section className="Events">
			<Card>
				<CardBody>
					{events && (
						<div>
							<CardTitle className="font-weight-bold text-center">
								<SearchForm searchFor={getEvents} />
							</CardTitle>

							{events.map((event) => (
								<ListGroup key={event.title}>
									<Link to={`/events/${event.id}`} key={event.id}>
										<ListGroupItem key={event.id}>{event.title}</ListGroupItem>
									</Link>
								</ListGroup>
							))}
						</div>
					)}
				</CardBody>
			</Card>
		</section>
	);
};

export default Events;
