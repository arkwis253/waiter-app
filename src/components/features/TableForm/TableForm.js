import styles from './TableForm.module.scss';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux/';
import { updateTablesRequest } from '../../../redux/tablesRedux';

const TableForm = () => {
	
	const getTable = (tables, tableId) => {
		return tables.find(table => table.id === tableId);	
	};

	
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {id} = useParams();
	const table = useSelector(state => getTable(state.tables, parseInt(id)));

	const [errorMessage, setErrorMessage] = useState('');

	const [formValues, setFormValues] = useState({
		selectedOption: '',
		peopleAmount: '',
		maxPeopleAmount: '',
		billValue: '',
	});


	const selectedOptionHandler = (e) => {
		const optionValue = e.target.value;
		setFormValues({
			...formValues, 
			selectedOption: optionValue
		});
		if(optionValue === 'Busy')
			setFormValues({
				...formValues,
				selectedOption: optionValue,
				billValue: 0
			});
		else if(optionValue === 'Cleaning' || optionValue === 'Free') {
			setFormValues({
				...formValues,
				selectedOption: optionValue, 
				peopleAmount: 0,
				maxPeopleAmount: 0,
				billValue: 0
			});
		}
	}

	const formSubmitHandler = (e) => {
		e.preventDefault();
		if(formValues.peopleAmount < 0 || formValues.maxPeopleAmount < 0) {
			setErrorMessage('Change amount of people!');
		} else if(isNaN(formValues.peopleAmount) || isNaN(formValues.maxPeopleAmount)) {
			setErrorMessage('Some of the value is not a number');
		} else {
			dispatch(updateTablesRequest(formValues, id));
			navigate('/');
		}
	}

	const peopleAmountHandler = e => {
		const peopleAmountValue = parseInt(e.target.value);
		if(isNaN(peopleAmountValue) && peopleAmountValue <= 0 && peopleAmountValue >= 10) {
			setFormValues({
				...formValues, 
				peopleAmount: formValues.peopleAmount
			});
		} else if(peopleAmountValue > formValues.maxPeopleAmount)
			setFormValues({
				...formValues, 
				peopleAmount: formValues.maxPeopleAmount
			});
		else
			setFormValues({
				...formValues, 
				peopleAmount: peopleAmountValue
			});
	}

	const maxPeopleAmountHandler = e => {
		const maxPeopleAmountValue = parseInt(e.target.value);
		if(maxPeopleAmountValue > 10 || maxPeopleAmountValue < 0){
			setFormValues({
				...formValues, 
				maxPeopleAmount: formValues.maxPeopleAmount
			});
		} else if(maxPeopleAmountValue < formValues.peopleAmount) {
			setFormValues({
				...formValues, 
				maxPeopleAmount: maxPeopleAmountValue,
				peopleAmount: maxPeopleAmountValue
			});
		} else
			setFormValues({
				...formValues, 
				maxPeopleAmount: maxPeopleAmountValue
			});
	}

	const billHandler = e => {
		const value = parseInt(e.target.value);
		if(!isNaN(value))
			setFormValues({...formValues, billValue: value});
		else
			setErrorMessage('Some of the value is not a number');
	}


	useEffect(() => {
		if(table){
			setFormValues({
				...formValues, 
				selectedOption: table.status,
				peopleAmount: table.peopleAmount,
				maxPeopleAmount: table.maxPeopleAmount,
				billValue: table.bill
			});
		}
	}, [table])
	
	if(!table) return <Navigate to="/" />;
	else return(
		<>
			<Form className={styles.form} onSubmit={e => formSubmitHandler(e)}>
			<h2 className={styles.title}>Table {id}</h2>
			<Form.Group as={Row} className={styles.row}>
					<Form.Label column xs="12" lg="1" className={styles.label}>Status: </Form.Label>
				<Col xs="12" lg="2">
					<Form.Select value={formValues.selectedOption} onChange={selectedOptionHandler}>
						<option value="Busy">Busy</option>
						<option value="Free">Free</option>
						<option value="Reserved">Reserved</option>
						<option value="Cleaning">Cleaning</option>
					</Form.Select>
				</Col>
			</Form.Group> 

			<Form.Group as={Row} className={clsx(
				styles.row,
				formValues.selectedOption === 'Free' || formValues.selectedOption === 'Cleaning' ? styles.hide : styles.active
			)}>
				<Form.Label column xs="12" lg="1" className={styles.label}>People: </Form.Label>
				<Col xs="12" lg="2" className={styles.ppl}>
					<Form.Control type="text" value={formValues.peopleAmount || ''} onChange={e => {peopleAmountHandler(e)}}/> 
					<span>/</span> 
					<Form.Control type="text" value={formValues.maxPeopleAmount || ''} onChange={e => maxPeopleAmountHandler(e)} />
				</Col> 
			</Form.Group>
			
			<Form.Group as={Row} className={clsx(
				styles.row, 
				formValues.selectedOption === 'Busy' ? styles.active : styles.hide
				)}>
				<Form.Label column xs="12" lg="1" className={styles.label}>Bill: </Form.Label> 
				<Col xs="12" lg="1" className={styles.bill}>
					<span>$</span><Form.Control type="text" value={formValues.billValue || ''} onChange={e => {billHandler(e)}} />
				</Col>
			</Form.Group>
			
			{errorMessage && <div className={styles.error}>{errorMessage}</div>}
			<Button type="submit" className={styles.btn}>Update</Button>
		</Form>
		</>
	);
}

export default TableForm;