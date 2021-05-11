import React from "react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

const EventCheckbox = ({ events }) => {
	return (
		<Form>
			<Row>
				{events &&
					events.map((event) => (
						<Col m={4}>
							<FormGroup check>
								<Label check>
									<Input type="checkbox" /> {event.title}
								</Label>
							</FormGroup>
						</Col>
					))}
			</Row>
		</Form>
	);
};

export default EventCheckbox;
