import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Alert from "../Alert";
/** Search form to filter out companies and jobs, located on MainSearch page for both components. */
// const CLIENT_ID = "fuu4Aqv5aFWntJFpJUnvLVyzmKhRFzGN1Z85GUmUfH0";

const InspirationForm = ({ searchFor }) => {
	// console.log(searchFor);
	const [ formData, setFormData ] = useState({
		page: 1,
		query: "",
		color: "",
		orientation: ""
	});
	const [ formErrors, setFormErrors ] = useState([]);

	/** On submit, redirect to homepage "/". */

	async function handleSubmit (e) {
		e.preventDefault();
		let result = await searchFor(formData);
		if (!result.success) {
			setFormErrors(result.errors);
		}
	}

	function handleChange (e) {
		const { name, value } = e.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
	}

	return (
		<div className="SearchForm">
			<Form className="form-inline" onSubmit={handleSubmit}>
				<FormGroup>
					<Label htmlFor="query" />
					<Input
						className="form-control flex-grow-1"
						name="query"
						placeholder="Enter search term.."
						value={formData.query}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="page" />
					<Input
						type="select"
						name="page"
						id="page"
						value={formData.page}
						onChange={handleChange}>
						<option>Pages</option>
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
					</Input>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="color" />
					<Input
						type="select"
						name="color"
						id="color"
						value={formData.color}
						onChange={handleChange}>
						<option>Color</option>
						<option>purple</option>
						<option>magenta</option>
						<option>orange</option>
						<option>red</option>
						<option>green</option>
						<option>teal</option>
						<option>blue</option>
						<option>yellow</option>
						<option>black</option>
						<option>white</option>
						<option>black_and_white</option>
					</Input>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="orientation" />
					<Input
						type="select"
						name="orientation"
						id="orientation"
						value={formData.orientation}
						onChange={handleChange}>
						<option>Orientation</option>
						<option>landscape</option>
						<option>portrait</option>
						<option>squarish</option>
					</Input>
				</FormGroup>
				{formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}

				<Button type="submit" className="btn btn-success" onSubmit={handleSubmit}>
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default InspirationForm;
