import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Image, Row, Col } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import "./MyEvent.css";
import dict from "./helpers/dictionary";
import BoogieBotApi from "./Api";

const SearchEvent = ({ events }) => {
	const { id } = useParams();

	const [ evtMoodboard, setEvtMoodboard ] = useState([]);
	let event = events.find((event) => parseInt(event.id) === parseInt(id));

	useEffect(
		() => {
			async function getEvent (id) {
				let moodboard = await BoogieBotApi.getEvent(event.id);
				setEvtMoodboard(moodboard);
			}
			getEvent(event.id);
		},
		[ event.id ]
	);

	if (!events) return console.error(dict.consoleEventsError);

	return (
		<div>
			<p className="MyEvent-rmrk">
				<i>browse pictures in Get Inspired tab to save them here</i>
			</p>
			<Row>
				<Col m={6}>
					<div className="mb-left">
						{evtMoodboard.moodboard &&
							evtMoodboard.moodboard.map(
								(item) =>
									item.inspirationUrl && (
										<Image
											key={uuid()}
											className="mb-insp"
											fluid
											src={item.inspirationUrl}
										/>
									)
							)}
					</div>
				</Col>
				<Col m={6}>
					<div className="mb-right">
						<Card className="Event-card">
							<CardBody>
								<div className="title-icon">
									<CardTitle className="font-weight-bold text-center mb-card-title">
										{event.title}
									</CardTitle>
									<Link to={`/events/${event.id}/edit`}>
										<FontAwesomeIcon className="icon" icon={faEdit} />
									</Link>
								</div>
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
									<b>{dict.myEventLocation}</b> {event.city} | {event.state} |{" "}
									{event.country}
								</p>
								<CardTitle className="font-weight-bold text-center mb-catering-title">
									{dict.myEventCat}
								</CardTitle>
								<i>browse restaurants in Catering tab to save them here</i>
								<ol>
									{evtMoodboard.moodboard &&
										evtMoodboard.moodboard.map(
											(item) =>
												item.restaurantName && (
													<div key={uuid()}>
														<li>
															<Card className="Cat-card">
																<CardTitle>
																	{item.restaurantName}
																</CardTitle>

																<CardSubtitle>
																	<a
																		target="_blank"
																		rel="noreferrer"
																		href={`http://maps.google.com/?q=${item.restaurantAddress}`}>
																		{item.restaurantAddress}
																	</a>
																</CardSubtitle>
															</Card>
														</li>
													</div>
												)
										)}
								</ol>
							</CardBody>
						</Card>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default SearchEvent;
