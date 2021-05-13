import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";

const EventCheckbox = ({ events, currentUser }) => {
	const [ checkedId, setCheckedId ] = useState(null);

	if (!currentUser.username) return <Redirect to="/" />;

	let filteredEvents = currentUser.isAdmin
		? events
		: events.filter((e) => Object.values(e).includes(currentUser.username));

	const getValue = (e) => {
		if (e.target.checked) {
			setCheckedId(e.target.value); // got the id of checked event
		}
	};

	return (
		<Form className="form-inline">
			<Row>
				{filteredEvents &&
					filteredEvents.map((event) => (
						<Col m={4}>
							<FormGroup check>
								<Label check>
									<Input
										type="checkbox"
										value={event.id}
										onClick={getValue}
									/>{" "}
									{event.title}
								</Label>
							</FormGroup>
						</Col>
					))}
			</Row>
		</Form>
	);
};

export default EventCheckbox;
