import React from "react";
import "./Events.css";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import dict from "./helpers/dictionary";

const Events = ({ events, currentUser }) => {
	if (!currentUser.username) return <Redirect to="/" />;

	let filteredEvents = currentUser.isAdmin
		? events
		: events.filter((e) => Object.values(e).includes(currentUser.username));

	return (
		<div className="Events">
			{events && (
				<div className="Events-body">
					<div className="Events-create">
						<Link to="/events/new" className="Events-new">
							<span className="big-bold">{dict.eventsCreate}</span>
							<p>{dict.eventsNew}</p>
							<i>{dict.eventsMisc}</i>
						</Link>
					</div>
					<div className="Events-current">
						{filteredEvents.map((event) => (
							<Link to={`/events/${event.id}`} key={event.id} className="link">
								<Card className="evt">
									<CardImg
										className="evt-img"
										top
										width="100%"
										src={event.imgUrl}
										alt="Card image cap"
									/>
									<CardBody>
										<CardTitle tag="h5">{event.title}</CardTitle>
									</CardBody>
								</Card>
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Events;
