import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import SearchForm from "./forms/SearchForm";
import Alert from "./helpers/Alert";
import { Form, FormGroup, Label, Input, Row, Col, Button } from "reactstrap";
import dict from "./helpers/dictionary";
import { Image } from "react-bootstrap";
import "./Inspiration.css";
import { CLIENT_ID_UNSPLASH } from "./secret";

const API_BASE_URL = "https://api.unsplash.com/search/photos?";

const Inspiration = ({ events, currentUser, saveToMoodboard }) => {
	const [ pictures, setPictures ] = useState([]);
	const [ checkedId, setCheckedId ] = useState(null); // get id of which event is checked
	const [ inspUrl, setInspUrl ] = useState(null); // get url of which image is clicked
	const [ formErrors, setFormErrors ] = useState([]);

	useEffect(() => {
		getPictures();
	}, []);

	async function getPictures (query) {
		let pics = await axios.get(
			`${API_BASE_URL}client_id=${CLIENT_ID_UNSPLASH}&query=${query}&orientation=squarish&per_page=100`
		);
		let data = pics.data.results;
		setPictures(data);
	}

	// FROM EVENT CHECKBOX FORM
	let filteredEvents = currentUser.isAdmin
		? events
		: events.filter((e) => Object.values(e).includes(currentUser.username));

	const getEventId = (e) => {
		if (e.target.checked) {
			setCheckedId(e.target.value); // got the id of checked event
		}
	};

	const getInspImageUrl = (e) => {
		setInspUrl(e.target.src); // getting URL
	};

	// SUBMIT FORM
	async function handleSubmit (e) {
		e.preventDefault();
		let result = await saveToMoodboard({
			event_id: parseInt(checkedId),
			inspiration_url: inspUrl,
			restaurant_key: null
		});
		if (result.success) {
			setFormErrors(result.errors);
		}
	}

	if (!events) return <Redirect to="/" />;
	if (!currentUser.username) return <Redirect to="/" />;

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
									<Col m={4}>
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
						{pictures.map((item) => (
							<div>
								<Button type="submit" className="Insp-btn">
									<Image
										className="Inspiration-rounded"
										onClick={getInspImageUrl}
										value={item.urls.regular}
										fluid
										src={item.urls.regular}
									/>
								</Button>
								{formErrors.length ? (
									<Alert type="danger" messages={formErrors} />
								) : null}
							</div>
						))}
					</div>
				</Form>
			</div>
		</div>
	);
};

export default Inspiration;
