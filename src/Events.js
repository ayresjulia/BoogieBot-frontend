import React from "react";
import { Card, CardImg, CardBody, CardTitle, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./Events.css";
import dict from "./helpers/dictionary";
import BoogieBotApi from "./Api";

const Events = ({ events, currentUser }) => {
	const history = useHistory();
	let filteredEvents = currentUser.isAdmin
		? events
		: events.filter((e) => Object.values(e).includes(currentUser.username));

	const removeEvent = async (e) => {
		let btn = e.target.parentNode;
		let evtId = btn.id;

		try {
			await BoogieBotApi.removeEvent(evtId);
			let closestCard = btn.parentNode;
			closestCard.remove();
			history.push("/events");
		} catch (err) {
			console.error(err);
		}
	};

	if (!events) return console.error(dict.consoleEventsError);
	if (!currentUser.username) return console.error(dict.consoleUserError);

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
							<p>
								<i>{dict.eventsNew}</i>
							</p>
						</Link>
					</div>

					<div className="Events-current">
						{filteredEvents.map((event) => (
							<div key={event.id}>
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
								<div id={event.id}>
									<Button onClick={removeEvent}>Delete</Button>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Events;
