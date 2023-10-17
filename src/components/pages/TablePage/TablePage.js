import styles from './TablePage.module.scss';
import { useParams, Navigate } from 'react-router-dom';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux/';

const TablePage = () => {
	
	const getTable = (tables, tableId) => {
		return tables.find(table => table.id === tableId);	
	}
	
	const {id} = useParams();
	const table = useSelector(state => getTable(state.tables, parseInt(id)));
	const [selectedOption, setSelectedOption] = useState('');
	const [peopleAmount, setPeopleAmount] = useState('');
	const [maxPeopleAmount, setMaxPeopleAmount] = useState('');
	const [billValue, setBillValue] = useState('');
	const [errorMessage, setErrorMessage] = useState('');


	const selectedOptionHandler = (e) => {
		const optionValue = e.target.value;
		setSelectedOption(optionValue);
		if(optionValue === 'Busy')
			setBillValue(0);
		else if(optionValue === 'Cleaning' || optionValue === 'Free') {
			setPeopleAmount(0);
			setMaxPeopleAmount(0);
			setBillValue(0);
		}
	}

	const formSubmitHandler = (e) => {
		e.preventDefault();
		if(peopleAmount <= 0 || maxPeopleAmount <= 0)
			setErrorMessage('Change amount of people!');
		else if(isNaN(peopleAmount) || isNaN(maxPeopleAmount))
			setErrorMessage('Some of the value is not a number');
		else
			setErrorMessage(`${selectedOption} ${peopleAmount} ${maxPeopleAmount} ${billValue}`);
	}

	const peopleAmountHandler = e => {
		const peopleAmountValue = parseInt(e.target.value);
		if(isNaN(peopleAmountValue) && peopleAmountValue <= 0 && peopleAmountValue >= 10)
			setPeopleAmount(peopleAmount)
		else {
			if(peopleAmountValue > maxPeopleAmount)
				setPeopleAmount(maxPeopleAmount);
			else
				setPeopleAmount(peopleAmountValue);
		}
	}

	const maxPeopleAmountHandler = e => {
		const maxPeopleAmountValue = e.target.value;
		if(maxPeopleAmountValue > 10 || maxPeopleAmountValue < 0){
			setMaxPeopleAmount(maxPeopleAmount);
		} else if(maxPeopleAmountValue < peopleAmount) {
			setMaxPeopleAmount(maxPeopleAmountValue);
			setPeopleAmount(maxPeopleAmountValue);
		} else
			setMaxPeopleAmount(maxPeopleAmountValue);
	}


	useEffect(() => {
		if(table){
			setSelectedOption(table.status);
			setPeopleAmount(table.peopleAmount);
			setMaxPeopleAmount(table.maxPeopleAmount);
			setBillValue(table.bill);
		}
	}, [table])

	if(!table) return <Navigate to="/" />;
	return(
		<>
		<Form className={styles.form} onSubmit={e => formSubmitHandler(e)}>
			<h2 className={styles.title}>Table {id}</h2>
			<Form.Group as={Row} className={styles.row}>
					<Form.Label column xs="12" lg="1" className={styles.label}>Status: </Form.Label>
				<Col xs="12" lg="2">
					<Form.Select value={selectedOption} onChange={selectedOptionHandler}>
						<option value="Busy">Busy</option>
						<option value="Free">Free</option>
						<option value="Reserved">Reserved</option>
						<option value="Cleaning">Cleaning</option>
					</Form.Select>
				</Col>
			</Form.Group> 

			<Form.Group as={Row} className={clsx(
				styles.row,
				selectedOption === 'Free' || selectedOption === 'Cleaning' ? styles.hide : styles.active
			)}>
				<Form.Label column xs="12" lg="1" className={styles.label}>People: </Form.Label>
				<Col xs="12" lg="2" className={styles.ppl}>
					<Form.Control type="text" value={peopleAmount || ''} onChange={e => {peopleAmountHandler(e)}}/> 
					<span>/</span> 
					<Form.Control type="text" value={maxPeopleAmount || ''} onChange={e => maxPeopleAmountHandler(e)} />
				</Col> 
			</Form.Group>
			
			<Form.Group as={Row} className={clsx(
				styles.row, 
				selectedOption === 'Busy' ? styles.active : styles.hide
				)}>
				<Form.Label column xs="12" lg="1" className={styles.label}>Bill: </Form.Label> 
				<Col xs="12" lg="1" className={styles.bill}>
					<span>$</span><Form.Control type="text" value={billValue || ''} onChange={(e) => setBillValue(e.target.value)} />
				</Col>
			</Form.Group>
			
			{errorMessage && <div className={styles.error}>{errorMessage}</div>}
			<Button type="submit" className={styles.btn}>Update</Button>
		</Form>

		</>
	);
}

export default TablePage;