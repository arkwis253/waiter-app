import styles from './Table.module.scss';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Table = (props) => {
	return(
		<li className={styles.table}>
			<h3 className={styles.header}>Table {props.id}</h3>
			<p className={styles.status}><span>Status: </span> {props.status}</p>
			<Link to={'/table/' + props.id} className={styles.btn}>
				<Button variant="primary" >Show more</Button>
			</Link>
		</li>
	);
}

export default Table;