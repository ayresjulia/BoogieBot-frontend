import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "react-bootstrap";
import { Form, FormGroup, Label, Input, Row, Col, Button } from "reactstrap";

import "./Inspiration.css";
import SearchForm from "./forms/SearchForm";
import dict from "./helpers/dictionary";
import { CLIENT_ID_UNSPLASH, UNSPLASH_API_URL } from "./secret";

const Inspiration = ({ events, currentUser, saveToMoodboard }) => {
	const [ pictures, setPictures ] = useState([]);
	const [ checkedId, setCheckedId ] = useState(null);
	const [ inspUrl, setInspUrl ] = useState(null);
	const [ formErrors, setFormErrors ] = useState([]);

	useEffect(() => {
		getPictures();
	}, []);

	async function getPictures (query) {
		let pics = await axios.get(
			`${UNSPLASH_API_URL}client_id=${CLIENT_ID_UNSPLASH}&query=${query}&orientation=squarish&per_page=100`
		);
		let data = pics.data.results;
		setPictures(data);
	}

	let filteredEvents = currentUser.isAdmin
		? events
		: events.filter((e) => Object.values(e).includes(currentUser.username));

	const getEventId = (e) => {
		if (e.target.checked) {
			setCheckedId(e.target.value);
		}
	};

	const getInspImageUrl = (e) => {
		setInspUrl(e.target.src);
	};

	async function handleSubmit (e) {
		e.preventDefault();
		setFormErrors([]);

		let result = await saveToMoodboard({
			event_id: parseInt(checkedId),
			inspiration_url: inspUrl,
			restaurant_key: null
		});
		if (!result.success) {
			setFormErrors(result.errors);
			console.error(formErrors);
			alert("Please choose an event first.");
		}
	}

	if (!events) return console.error(dict.consoleEventsError);
	if (!currentUser.username) return console.error(dict.consoleUserError);

	return (
		<div>
			<div className="Inspiration-form">
				<div className="Inspiration-new">
					<span className="bold">{dict.inspirationAdd}</span>
					<p className="Inspiration-p">{dict.inspirationInfo}</p>
					<p className="small-text">{dict.inspirationFootnote}</p>
				</div>
				<SearchForm searchFor={getPictures} />
			</div>
			<div>
				<Form className="form-inline" onSubmit={handleSubmit}>
					<div className="Inspiration-row">
						<Row>
							{filteredEvents &&
								filteredEvents.map((event) => (
									<Col key={event.id}>
										<FormGroup check>
											<Label check>
												<Input
													type="checkbox"
													value={event.id}
													onChange={getEventId}
												/>{" "}
												{event.title}
											</Label>
										</FormGroup>
									</Col>
								))}
						</Row>
					</div>
					<div className="Inspiration-imgs">
						<Row xs="1" sm="2" md="4">
							{pictures.map((item) => (
								<Col key={item.id}>
									<Button type="submit" className="Insp-btn">
										<Image
											className="Inspiration-rounded"
											onClick={getInspImageUrl}
											value={item.urls.regular}
											fluid
											src={item.urls.regular}
										/>
									</Button>
								</Col>
							))}
						</Row>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default Inspiration;
