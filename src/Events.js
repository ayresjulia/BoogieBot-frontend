import React from "react";
// import EventForm from "./forms/EventForm";
import "./Events.css";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

const Events = ({ events }) => {
	return (
		<div className="Events">
			{events && (
				<div className="Events-body">
					<div className="Events-create">
						<Link to="/events/new" className="Events-new">
							<span className="big-bold">create</span>
							<p>new event.</p>
							<i>or modify existing.</i>
						</Link>
					</div>
					<div className="Events-current">
						{events.map((event) => (
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
