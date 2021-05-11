import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../Alert";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Row, Col } from "react-bootstrap";
import "./EventForm.css";

/** Form to signup a user and save user to db. */

const EventForm = ({ newEvent }) => {
	const history = useHistory();
	const [ formData, setFormData ] = useState({
		title: "",
		description: "",
		eventDate: "",
		eventTime: "",
		city: "",
		state: "",
		country: "",
		imgUrl: ""
	});
	const [ formErrors, setFormErrors ] = useState([]);

	/** On submit, redirect to homepage "/". */

	async function handleSubmit (e) {
		e.preventDefault();
		let result = await newEvent(formData);
		if (result.success) {
			history.push("/");
		} else {
			setFormErrors(result.errors);
		}
	}

	function handleChange (e) {
		const { name, value } = e.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
	}

	return (
		<div className="EventForm">
			<div className="EventForm-left">
				<span className="big-bold">tip.</span>
				<p>
					scoop your ice-cream into a cupcake pan and pop in the freezer for a hassle-free
					serving at your party.
				</p>
			</div>
			<div className="EventForm-right">
				<Form className="Form-body" onSubmit={handleSubmit}>
					<FormGroup>
						<Label htmlFor="title" />
						<Input
							id="title"
							name="title"
							className="Form-input"
							value={formData.title}
							placeholder="title"
							onChange={handleChange}
							required
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="description" />
						<Input
							id="description"
							name="description"
							className="Form-input"
							value={formData.description}
							placeholder="description"
							onChange={handleChange}
							required
						/>
					</FormGroup>
					<Row form>
						<Col md={6}>
							<FormGroup className="form-row">
								<Label htmlFor="eventDate" />
								<Input
									id="eventDate"
									name="eventDate"
									className="Form-input"
									value={formData.eventDate}
									placeholder="event date"
									onChange={handleChange}
									required
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label htmlFor="eventTime" />
								<Input
									id="eventTime"
									name="eventTime"
									className="Form-input"
									value={formData.eventTime}
									placeholder="event time"
									onChange={handleChange}
									required
								/>
							</FormGroup>
						</Col>
					</Row>
					<Row form>
						<Col md={6}>
							<FormGroup>
								<Label htmlFor="city" />
								<Input
									id="city"
									name="city"
									className="Form-input"
									value={formData.city}
									placeholder="city"
									onChange={handleChange}
									required
								/>
							</FormGroup>
						</Col>
						<Col md={2}>
							<FormGroup>
								<Label htmlFor="state" />
								<Input
									id="state"
									name="state"
									className="Form-input"
									value={formData.state}
									placeholder="state"
									onChange={handleChange}
								/>
							</FormGroup>
						</Col>

						<Col md={4}>
							<FormGroup>
								<Label htmlFor="country" />
								<Input
									id="country"
									name="country"
									className="Form-input"
									value={formData.country}
									placeholder="country"
									onChange={handleChange}
									required
								/>
							</FormGroup>
						</Col>
					</Row>
					<FormGroup>
						<Label htmlFor="imgUrl" />
						<Input
							id="imgUrl"
							name="imgUrl"
							className="Form-input"
							value={formData.imgUrl}
							placeholder="event image url (optional)"
							onChange={handleChange}
							required
						/>
					</FormGroup>
					{formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}

					<Button className="btn btn-success float-right" onSubmit={handleSubmit}>
						Submit
					</Button>
				</Form>
			</div>
		</div>
	);
};

export default EventForm;
