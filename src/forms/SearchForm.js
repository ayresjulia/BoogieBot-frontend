import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./SearchForm.css";

/** Search form to filter out companies and jobs, located on MainSearch page for both components. */

const SearchForm = ({ searchFor }) => {
	const [ search, setSearch ] = useState("");

	const handleSubmit = (e) => {
		// take care of accidentally trying to search for just spaces
		e.preventDefault();
		searchFor(search.trim() || undefined);
		setSearch(search.trim());
	};

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	return (
		<div className="SearchForm">
			<Form className="form-inline" onSubmit={handleSubmit}>
				<FormGroup>
					<Label htmlFor="search" />
					<Input
						className="form-control flex-grow-1"
						name="search"
						placeholder="Enter search term.."
						value={search}
						onChange={handleChange}
					/>
					<Button type="submit" className="btn btn-success">
						Submit
					</Button>
				</FormGroup>
			</Form>
		</div>
	);
};

export default SearchForm;
