import React from "react";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

import "./Events.css";
import dict from "./helpers/dictionary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import BoogieBotApi from "./Api";

const Events = ({ events, currentUser }) => {
	let filteredEvents = currentUser.isAdmin
		? events
		: events.filter((e) => Object.values(e).includes(currentUser.username));

	if (!events) return console.error(dict.consoleEventsError);
	if (!currentUser.username) return console.error(dict.consoleUserError);

	// let event = events.find((evt) => parseInt(evt.id) === parseInt(id));

	// async function removeEvent () {
	// 	await BoogieBotApi.removeEvent(event.id);
	// }

	return (
		<div className="Events">
			<p className="Events-rmrk">
				<i>{dict.eventsRmrk}</i>
			</p>
			{filteredEvents && (
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
							<div>
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
								<Link to={`/events/${event.id}/delete`}>
									<FontAwesomeIcon
										className="icon"
										icon={faTrash}
										// onClick={removeEvent}
									/>
								</Link>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Events;
